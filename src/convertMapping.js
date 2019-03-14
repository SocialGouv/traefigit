const pick = require("lodash.pick");

const exclude = (keys, exclude) =>
  keys.filter(key => exclude.indexOf(key) === -1);

// convert mappings.json to traefik REST format
const convertMapping = mapping => {
  const frontends = mapping.reduce(
    (map, entry) => ({
      ...map,
      [entry.id]: {
        backend: entry.id,
        routes: {
          route0: {
            rule: entry.rule
          }
        },
        // apply all keys to frontend, except the 3 shortcuts
        ...pick(entry, exclude(Object.keys(entry), ["backend", "rule", "id"]))
      }
    }),
    {}
  );
  const backends = mapping.reduce(
    (map, entry) => ({
      ...map,
      [entry.id]: {
        servers: {
          server0: {
            url: entry.backend
          }
        }
      }
    }),
    {}
  );
  return {
    frontends,
    backends
  };
};

module.exports = convertMapping;

if (require.main === module) {
  const mapping = require("../mapping.json");
  console.log(JSON.stringify(convertMapping(mapping), null, 2));
}
