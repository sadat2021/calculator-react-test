import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount, shallow } from "enzyme";
import App from "./App";

configure({ adapter: new Adapter() });

describe("Calculator React Test", () => {
  it("takes a snapshot from the Calculator component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
  it("checks to see add and equals opertion work correctly", () => {
    const wrapper = mount(<App />);

    const key1 = wrapper.find('[data-testid="key1"]');
    const key2 = wrapper.find('[data-testid="key2"]');
    const display = wrapper.find('[data-testid="display"]');
    const key5 = wrapper.find('[data-testid="key5"]');
    const key7 = wrapper.find('[data-testid="key7"]');
    const add = wrapper.find('[data-testid="add"]');
    const equals = wrapper.find('[data-testid="equals"]');

    expect(key1.length).toBe(1);
    expect(key2.length).toBe(1);
    expect(display.length).toBe(1);
    expect(key5.length).toBe(1);
    expect(key7.length).toBe(1);
    expect(add.length).toBe(1);
    expect(equals.length).toBe(1);

    key1.at(0).simulate("click");
    key2.at(0).simulate("click");
    add.at(0).simulate("click");
    key5.at(0).simulate("click");
    key7.at(0).simulate("click");
    equals.at(0).simulate("click");

    expect(display.at(0).text()).toBe("69");
  });
});
