const convertMapping = require("../src/convertMapping");

const sampleMapping = require("../mapping.sample.json");

test("should work", () => {
  expect(convertMapping(sampleMapping)).toMatchSnapshot();
});
