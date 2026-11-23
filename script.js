const repositoryList = document.querySelector("#repository-list");

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status})`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren();

    for (const repository of repositories) {
      const item = document.createElement("li");
      const heading = document.createElement("h2");
      const link = document.createElement("a");
      const description = document.createElement("p");
      const date = document.createElement("time");

      link.href = repository.url;
      link.textContent = repository.name;
      heading.append(link);
      description.textContent = repository.description;
      date.dateTime = repository.starred_at;
      date.textContent = `Starred on ${repository.starred_at}`;

      item.append(heading, description, date);
      repositoryList.append(item);
    }

    if (repositories.length === 0) {
      repositoryList.textContent = "No starred repositories yet.";
    }
  } catch (error) {
    console.error(error);
    repositoryList.textContent = "Unable to load starred repositories.";
  }
}

loadRepositories();
