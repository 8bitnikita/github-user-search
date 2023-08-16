import { KeyboardEvent, useRef, useState } from "react";

import styles from "./UserSearch.module.css";

interface IUser {
  avatar_url: string;
  login: string;
  bio: string;
  html_url: string;
}

export default function UserSearch() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<IUser | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (username.trim() === "") return;

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    }
  };

  const enterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className={styles.search}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={enterPressHandler}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {userData ? (
        <div className={styles.userCard}>
          <img src={userData.avatar_url} alt={`${username}'s avatar`} />
          <h2>{userData.login}</h2>
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            Visit GitHub Profile
          </a>
        </div>
      ) : (
        <p className={styles.error}>USER NOT FOUND</p>
      )}
    </div>
  );
}
