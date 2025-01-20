import { Router, Route } from "preact-router";
import LandingPage from "./pages/LandingPage/LandingPage";
import "./App.scss";
import CharacterSelectPage from "./pages/CharacterSelectPage/CharacterSelectPage";
import CharacterEditPage from "./pages/CharacterEditPage/CharacterEditPage";
import CharacterCreatePage from "./pages/CharacterCreatePage/CharacterCreatePage";
import CharacterReadPage from "./pages/CharacterReadPage/CharacterReadPage";
function App() {
  return (
    <Router>
      <Route path="/" component={LandingPage} />
      <Route path="character-select" component={CharacterSelectPage} />
      <Route path="character-edit" component={CharacterEditPage} />
      <Route path="character-create" component={CharacterCreatePage} />
      <Route path="character-read" component={CharacterReadPage} />
    </Router>
  );
}

export default App;
