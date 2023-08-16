import "./App.css";
import UserSearch from "./components/UserSearch";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub User Search</h1>
        <UserSearch />
      </header>
    </div>
  );
}
