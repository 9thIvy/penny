import { Router, Route } from "preact-router";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import CharacterSelectPage from "./pages/CharacterSelectPage/CharacterSelectPage";
import CharacterViewPage from "./pages/CharacterViewPage/CharacterViewPage";
function App() {
  return (
    <Router>
      <Route path="/" component={LandingPage} />
      <Route path="/character-select" component={CharacterSelectPage} />
      <Route path="/character-view" component={CharacterViewPage} />
    </Router>
  );
}

export default App;
