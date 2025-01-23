import { Router, Route } from "preact-router";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import CharacterSelectPage from "./pages/CharacterSelectPage/CharacterSelectPage";
function App() {
  return (
    <Router>
      <Route path="/" component={LandingPage} />
      <Route path="/character-select" component={CharacterSelectPage} />
    </Router>
  );
}

export default App;
