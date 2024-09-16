import Header from "components/commons/Header";
import Favourites from "components/Favourites";
import Home from "components/Home";
import { Route, Switch } from "react-router-dom";
import routes from "routes";

const App = () => (
  <div className="flex h-screen flex-col ">
    <Header />
    <Switch>
      <Route exact component={Favourites} path={routes.favourites} />
      <Route exact component={Home} path={routes.root} />
    </Switch>
  </div>
);

export default App;
