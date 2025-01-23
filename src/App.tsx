import { Router, Route } from "preact-router";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
function App() {
  return (
    <Router>
      <Route path="/" component={LandingPage} />
    </Router>
  );
}

export default App;
