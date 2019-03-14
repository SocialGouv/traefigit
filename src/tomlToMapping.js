const fs = require("fs");
const toml = require("toml");
const pick = require("lodash.pick");

// parse rule.toml as traefik REST format
const parseTOML = () => toml.parse(fs.readFileSync("./rules.toml").toString());

// convert rules.toml to human-friendly JSON mapping
const tomlToMapping = str => {
  const data = parseTOML(str);
  const services = {};
  Object.keys(data.backends).forEach(key => {
    services[key] = {
      backend: data.backends[key].servers.server0.url
    };
  });
  Object.keys(data.frontends).forEach(key => {
    const frontend = data.frontends[key];
    services[frontend.backend] = {
      ...(services[frontend.backend] || {}),
      rule: frontend.routes.route0.rule,
      // exclude some keys
      ...pick(frontend, exclude(Object.keys(frontend), ["routes", "backend"]))
    };
  });
  const mappings = Object.keys(services).map(key => ({
    id: key,
    ...services[key]
  }));
  return mappings;
};

const exclude = (keys, exclude) =>
  keys.filter(key => exclude.indexOf(key) === -1);

module.exports = tomlToMapping;

if (require.main === module) {
  console.log(JSON.stringify(convertMapping(), null, 2));
}
