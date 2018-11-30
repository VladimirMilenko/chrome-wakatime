# Configurable WakaTime plugin for chrome

## Build

Run to build the plugin:
```
npm i -g yarn
yarn
npm run build
```


## Installation

Go to `chrome://extensions/`
Enable developer mode, and load extension from root of `wakatime-chrome-parcel` repo.

## Config

You can find information on how to configure your app in example.config.json.

### Regular tracking

By default, no strategy is applied and config is treated as it was before.

| Option     | Type                                                            | Meaning                                                                         |
| ---------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `url`      | string with wildcard support                                    | Core uses this option to test it against the current url.                       |
| `trackBy`  | `tab` property where include/exclude properties will be matched | Core will use it as a trigger for tracking of a specific page in chrome to see. |
| `include`  | Array of strings                                                | Every string from include should be present in `tab[trackBy]`                   |
| `exclude`  | Array of strings                                                | Not a single string from exclude should be present in `tab[trackBy]`            |
| `project`  | string                                                          | WakaTime project                                                                |
| `category` | category for WakaTime                                           | Set it to `debugging`, and it will solve all your issues.                       |

### GitHub pull-request review tracking

With new version published on 18.09.2018 i changed the architecture of config-processing to use strategies.
Right now there is a `github-organization-pr` strategy which has following config:

| Option      | Type                               | Meaning                                                                                                                                                         |
| ----------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`       | string with wildcard support       | Core uses this option to test it against the current url.                                                                                                       |
| `whitelist` | array of organisation names        | Core will use it as a trigger for tracking of specific github organization. Like github.com/SEOshop/Backend SEOshop is an organisation, where Backend is a repo |
| `project`   | string which waka-time project use | If no option specified - it will track to the same project as the name of repo. Otherwise to specified value                                                    |
| `type`      | always should be a `domain`        | WakaTime internal field                                                                                                                                         |
| `category`  | always should be `code reviewing`  | WakaTime internal field                                                                                                                                         |
