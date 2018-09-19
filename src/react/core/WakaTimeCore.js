/* global browser */
//jshint esnext:true
import axios from "axios";
import moment from "moment";
import config from "../config";
import browser from "../browser-import";
import mm from "micromatch";
import * as url from "url";
// Helpers

import { wildcardToRegExp } from "../helpers/matchPath";
import changeExtensionState from "../helpers/changeExtensionState";
import in_array from "./../helpers/in_array";
import GithubOrganizationStrategy from "./track-strategies/GithubOrganizationPR";
import DefaultStrategy from "./track-strategies/Default";

const strategies = {
  "github-organization-pr": GithubOrganizationStrategy,
  default: DefaultStrategy
};

const useStrategy = (tab, config) => {
  const strategy = strategies[config.strategy](config);
  return strategy(tab);
};

const getHeartbeat = (logConfig, tab) => {
  for (let config of logConfig) {
    var lineRe = new RegExp(config.url.replace(".", ".").replace("*", ".*"));
    if (!lineRe.exec(tab.url)) continue;

    if (!config.strategy) config.strategy = "default";

    if (config.strategy && strategies[config.strategy]) {
      return useStrategy(tab, config);
    }
  }
};

class WakaTimeCore {
  constructor() {
    this.tabsWithDevtoolsOpen = [];
  }

  /**
   * Settter for tabsWithDevtoolsOpen
   *
   * @param tabs
   */
  setTabsWithDevtoolsOpen(tabs) {
    this.tabsWithDevtoolsOpen = tabs;
  }

  getTotalTimeLoggedToday() {
    const today = moment().format("YYYY-MM-DD");

    return axios.get(`${config.summariesApiUrl}?start=${today}&end=${today}`, {
      withCredentials: true
    });
  }

  /**
   * Checks if the user is logged in.
   *
   * @returns {*}
   */
  checkAuth() {
    return axios.get(config.currentUserApiUrl, {
      withCredentials: true
    });
  }

  /**
   * Depending on various factors detects the current active tab URL or domain,
   * and sends it to WakaTime for logging.
   */
  recordHeartbeat() {
    browser.storage.sync
      .get({
        loggingEnabled: config.loggingEnabled,
        loggingConfig: ""
      })
      .then(items => {
        if (items.loggingEnabled === true) {
          changeExtensionState("allGood");
          const loggingConfig = items.loggingConfig
            ? JSON.parse(items.loggingConfig)
            : { config: [] };

          browser.idle
            .queryState(config.detectionIntervalInSeconds)
            .then(newState => {
              if (newState === "active") {
                // Get current tab URL.
                browser.tabs.query({ active: true }).then(tabs => {
                  const currentActiveTab = tabs[0];
                  let debug = false;

                  // If the current active tab has devtools open
                  if (
                    in_array(currentActiveTab.id, this.tabsWithDevtoolsOpen)
                  ) {
                    debug = true;
                  }

                  const heartbeat = getHeartbeat(
                    loggingConfig.config,
                    currentActiveTab
                  );
                  if (heartbeat && heartbeat.project) {
                    this.sendHeartbeat(heartbeat, debug);
                  }
                });
              }
            });
        } else {
          changeExtensionState("notLogging");
        }
      });
  }

  /**
   * Creates payload for the heartbeat and returns it as JSON.
   *
   * @param heartbeat
   * @param type
   * @param debug
   * @returns {*}
   * @private
   */
  _preparePayload(heartbeat, type, debug = false) {
    return {
      entity: heartbeat.entity,
      type: heartbeat.type || type,
      ...(heartbeat.category ? { category: heartbeat.category } : {}),
      time: moment().format("X"),
      project: heartbeat.project || "<<LAST_PROJECT>>",
      branch: heartbeat.branch || "<<LAST_BRANCH>>",
      is_debugging: debug,
      plugin: `browser-wakatime/${config.version}`
    };
  }

  /**
   * Given the heartbeat and logging type it creates a payload and
   * sends an ajax post request to the API.
   *
   * @param heartbeat
   * @param debug
   */
  sendHeartbeat(heartbeat, debug) {
    let payload = null;

    payload = this._preparePayload(heartbeat, "url", debug);
    this.sendAjaxRequestToApi(payload);
  }

  /**
   * Sends AJAX request with payload to the heartbeat API as JSON.
   *
   * @param payload
   * @param method
   * @returns {*}
   */
  sendAjaxRequestToApi(payload, method = "POST") {
    return axios({
      url: config.heartbeatApiUrl,
      method: method,

      data: payload,
      withCredentials: true
    }).catch(err => {
      if (err.response.status === 401) {
        changeExtensionState("notSignedIn");
      }
    });
  }
}

export default new WakaTimeCore();
