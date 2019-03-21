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

  const response = await fetch(TRAEFIK_URL, {
    method: "PUT",
    body: JSON.stringify(mapping)
  })

  if (response.status > 300) {
    const error = new Error(response.statusText || response.status)
    error.response = response
    throw error;
  }

  console.log(`✔ traefik configuration updated`);
};

if (require.main === module) {
  updateTraefikFromMapping()
    .catch((e) => {
      console.error("𝙓 ERROR: ", e);
      process.exit(1);
    });
}
