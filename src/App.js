import "./App.css";

import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const GITHUB_BASE_URL = "https://api.github.com";

  const changeHandler = (event) => {
    setText(event.target.value);
  };

  const submitHandler = () => {
    if (!text) {
      alert("Please enter a username!");
      return;
    }

    axios
      .get(`${GITHUB_BASE_URL}/users/${text}`)
      .then((res) => setUser(res.data))
      .catch((error) => {
        if (error.response.status === 404) {
          alert("User not found!");
        }
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div>
        <h1> User Information</h1>
        <input
          type="text"
          placeholder="Type Username..."
          onChange={changeHandler}
        />

        <button onClick={submitHandler} className="btn">
          Submit
        </button>

        {user && (
          <div className="card" style={{ border: "1px solid black" }}>
            <img
              src={user.avatar_url}
              height="100px"
              width="100px"
              alt="user avatar"
            />
            <p>
              Name: <strong>{user.login}</strong>
            </p>
            <p>
              Created Date: <strong>{user.created_at}</strong>
            </p>
            <p>
              Public Repos: <strong>{user.public_repos}</strong>
            </p>
            <p>
              Public gists: <strong>{user.public_gists}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
