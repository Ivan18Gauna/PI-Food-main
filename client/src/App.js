import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./componets/Home";
import LandingPage from "./componets/LandingPage";
import Details from "./componets/Details";
import Create from "./componets/CreateRecipes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path='/details/:id' component={Details}/>
          <Route path='/create' component={Create}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
