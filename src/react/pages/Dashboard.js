import React from "react";
import { css } from "emotion";
import Spinner from "@atlaskit/spinner";
import browser from "../browser-import";
import NavBar from "../components/NavBar";
import CurrentTime from "../components/CurrentTime";
import TrackingToggler from "../components/TrackingToggler";
import changeExtensionState from "../helpers/changeExtensionState";
import wakatime from "../core/WakaTimeCore";

const BodyStyle = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `body {
    background-color: #0747A6;
  }`
    }}
  />
);

class Dashboard extends React.Component {
  state = {
    loggingEnabled: true,
    fetched: false
  };

  componentDidMount() {
    wakatime.getTotalTimeLoggedToday().then(res => {
      this.setState({
        time: res.data.data[0].grand_total.text,
        fetched: true
      });
    });
    browser.storage.sync
      .get({
        loggingEnabled: ""
      })
      .then(({ loggingEnabled }) => {
        this.setState({ loggingEnabled });
      });
  }

  handleTrackingChange = e => {
    if (e.target.checked) {
      this.enableLogging();
    } else {
      this.disableLogging();
    }
  };

  disableLogging = () => {
    this.setState({
      loggingEnabled: false
    });

    changeExtensionState("notLogging");

    browser.storage.sync.set({
      loggingEnabled: false
    });
  };

  enableLogging = () => {
    this.setState({
      loggingEnabled: true
    });

    changeExtensionState("allGood");

    browser.storage.sync.set({
      loggingEnabled: true
    });
  };

  render() {
    const { loggingEnabled, fetched, time } = this.state;
    return (
      <div
        className={css`
          padding: 20px;
        `}
      >
        <BodyStyle />
        <NavBar active="dashboard" />
        <CurrentTime time={fetched ? time : <Spinner />} />
        <TrackingToggler
          value={loggingEnabled}
          onTrackingStateChange={this.handleTrackingChange}
        />
      </div>
    );
  }
}

export default Dashboard;
