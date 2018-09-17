import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Spinner from "@atlaskit/spinner";
import LoggedOut from "./components/LoggedOut";
import Dashboard from "./pages/Dashboard";
import Options from "./pages/Options";

import "./styles.scss";
import "@atlaskit/css-reset";

import wakatime from "./core/WakaTimeCore";

class App extends React.Component {
  state = {
    fetching: false,
    loggedIn: true
  };

  componentDidMount() {
    wakatime
      .checkAuth()
      .then(res => {
        this.setState({
          loggedIn: true,
          fetching: false
        });
      })
      .catch(err => {
        this.setState({
          fetching: false,
          loggedIn: false
        });
      });
  }
  render() {
    const { fetching, loggedIn } = this.state;

    if (fetching) {
      return <Spinner />;
    } else {
      if (!loggedIn) return <LoggedOut />;
    }
    return (
      <Router>
        <Switch>
          <Route path="/logged_out" component={LoggedOut} />
          <Route path="/" exact component={Dashboard} />
          <Route path="/options" exact component={Options} />
        </Switch>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
