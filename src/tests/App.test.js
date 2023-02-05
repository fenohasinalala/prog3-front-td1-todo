import renderer from "react-test-renderer";
import App from "../App";

it("renders the landing page", () => {
  const component = renderer.create(<App />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
