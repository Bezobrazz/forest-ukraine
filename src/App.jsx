import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />

        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
