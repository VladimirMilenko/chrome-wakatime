import React from "react";
import { css } from "emotion";
import browser from "../browser-import";
import NavBar from "../components/NavBar";
import Options from "../components/Options";

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
    loggingConfig: ""
  };
  componentDidMount() {
    this.restoreSettings();
  }

  restoreSettings = () => {
    browser.storage.sync
      .get({
        loggingConfig: ""
      })
      .then(items => {
        this.setState({
          loggingConfig: items.loggingConfig
        });
      });
  };

  saveSettings = () => {
    const { loggingConfig } = this.state;

    browser.storage.sync
      .set({
        loggingConfig
      })
      .then(() => {
        // Set state to be newly entered values.
        this.setState({
          loggingConfig,
          displayAlert: true
        });
        setTimeout(() => {
          this.setState({ displayAlert: false });
        }, 2500);
      });
  };

  handleSubmit = e => {
    this.saveSettings();
  };

  handleConfigChange = e => {
    this.setState({
      loggingConfig: e.target.value
    });
  };

  render() {
    const { displayAlert, loggingConfig } = this.state;
    return (
      <div
        className={css`
          padding: 20px;
        `}
      >
        <BodyStyle />
        <NavBar active="options" />
        <Options
          config={loggingConfig}
          displayAlert={displayAlert}
          onChange={this.handleConfigChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Dashboard;
