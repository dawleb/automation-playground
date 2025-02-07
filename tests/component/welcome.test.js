import renderer from "react-test-renderer";
import Welcome from "./Welcome.js";
import React from "react";

test("renders correctly", () => {
  const tree = renderer.create(<Welcome />).toJSON();
  expect(tree).toMatchSnapshot();
});
