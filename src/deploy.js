const fetch = require("node-fetch");

const convertMapping = require("./convertMapping");

const TRAEFIK_URL =
  process.env.TRAEFIK_URL || "http://127.0.0.1:8080/api/providers/rest";

const updateTraefikFromMapping = async () => {
  const mappingData = require("../mapping.json");
  const mapping = convertMapping(mappingData);

  console.log(
    `Updating ${
      Object.keys(mapping.frontends).length
    } mappings on ${TRAEFIK_URL}...`
  );

  return await fetch(TRAEFIK_URL, {
    method: "PUT",
    body: JSON.stringify(mapping)
  })
    .then(r => r.json())
    .then(json => {
      console.log(`✔ traefik configuration updated`);
    })
    .catch(e => {
      console.log("𝙓 ERROR: ", e);
      throw e;
    });
};

if (require.main === module) {
  updateTraefikFromMapping();
}
