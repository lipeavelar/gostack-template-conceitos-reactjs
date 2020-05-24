import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    const result = await api.delete(`/repositories/${id}`);
    if (result.status === 204) {
      const reposUpdated = repos.filter((item) => item.id !== id);
      setRepos([...reposUpdated]);
    }
  }

  useEffect(() => {
    api.get("/repositories").then(({ data }) => setRepos(data));
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id.toString()}>
            {repo.title}
            <button onClick={() => handleRemoveRepository("123")}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
