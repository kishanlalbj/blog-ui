import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("rending app", () => {
  it("should renderapp", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
  });
});
