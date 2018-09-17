/* global browser */
import browser from "./browser-import";
//jshint esnext:true
const __DEV__ = process.env.__DEV__;

var config = {
  // Extension name
  name: "WakaTime",
  // Extension version
  version: __DEV__ ? "test" : browser.runtime.getManifest().version,
  // Time for idle state of the browser
  // The user is considered idle if there was
  // no activity in the browser for x seconds
  detectionIntervalInSeconds: 60,
  // By default logging is enabled
  loggingEnabled: true,
  // Url to which to send the heartbeat
  heartbeatApiUrl: "https://wakatime.com/api/v1/users/current/heartbeats",
  // Url from which to detect if the user is logged in
  currentUserApiUrl: "https://wakatime.com/api/v1/users/current",
  // The url to logout the user from wakatime
  logoutUserUrl: "https://wakatime.com/logout",
  // Gets stats from the WakaTime API
  summariesApiUrl: "https://wakatime.com/api/v1/users/current/summaries",
  // Different colors for different states of the extension
  colors: {
    allGood: "",
    notLogging: "gray",
    notSignedIn: "red",
    lightTheme: "white"
  },
  // Tooltips for each of the extension states
  tooltips: {
    allGood: "",
    notLogging: "Not logging",
    notSignedIn: "Not signed In",
    blacklisted: "This URL is blacklisted",
    whitelisted: "This URL is not on your whitelist"
  },
  // Valid extension states
  states: [
    "allGood",
    "notLogging",
    "notSignedIn",
    "blacklisted",
    "whitelisted"
  ],
  // Predefined alert type and text for success and failure.
  alert: {
    success: {
      type: "success",
      text: "Options have been saved!"
    },
    failure: {
      type: "danger",
      text: "There was an error while saving the options!"
    }
  }
};

module.exports = config;
