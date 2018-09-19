import getDomainFromUrl from "./../../helpers/getDomainFromUrl";

import { wildcardToRegExp } from "../../helpers/matchPath";

const isExcluded = (value, exclude = []) => {
  return exclude.some(x => value.includes(x));
};

const isIncluded = (value, include = []) => {
  return include.every(x => value.includes(x));
};

const Strategy = config => tab => {
  const tabUrl = tab.url;
  const matchingUrls = [config].filter(option => {
    const { trackBy, include, url, exclude } = option;

    if (new RegExp(url.replace(".", ".").replace("*", ".*")).exec(tabUrl)) {
      if (include.length && trackBy !== "host") {
        const target = tab[trackBy];
        if (
          isIncluded(target, include || []) &&
          !isExcluded(target, exclude || [])
        ) {
          return true;
        }
      }
      if (include.length && trackBy === "host") {
        const target = tab.url;
        if (isIncluded(target, include) && !isExcluded(target, exclude || [])) {
          return true;
        }
      }
      return false;
    }
    return false;
  });

  if (matchingUrls.length) {
    const match = matchingUrls[0];
    return {
      project: match.project,
      entity:
        match.trackBy === "host"
          ? getDomainFromUrl(tab.url)
          : tab[match.trackBy],
      type: match.type,
      ...(match.category ? { category: match.category } : {})
    };
  }
  return null;
};

export default Strategy;
