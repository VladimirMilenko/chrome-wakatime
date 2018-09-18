import matchPath from "../../helpers/matchPath";
import url from "url";
/*

url: github.com/<OrgName>/<Project>/*

organizations : Array<string>

Will track any Repo when organizations.includes(OrgName);

*/

const Strategy = config => {
  let { whitelist } = config;

  whitelist = whitelist.map(x => x.toLowerCase());

  return tab => {
    const { title, url: taburl } = tab;
    const path = url.parse(taburl).pathname;
    const parseResult = matchPath(path, {
      path: "/:organization/:project"
    });

    if (!title.includes(" · Pull Request ") || !taburl.includes("/pull/"))
      return null;

    if (!parseResult || !parseResult.params) return null;

    const { organization, project } = parseResult.params;
    if (!organization || !project) return null;
    if (!whitelist.includes(organization.toLowerCase())) return null;

    console.log(title);
    return {
      project: config.project ? config.project : project.toLowerCase(),
      type: config.type,
      category: config.category,
      entity: title.split(" · ")[0]
    };
  };
};

export default Strategy;
