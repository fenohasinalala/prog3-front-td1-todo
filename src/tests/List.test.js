import { render, screen } from "@testing-library/react";
import Items from "../components/Items";
import { mocked } from "jest-mock";
import List from "../components/List";
import ToDoForm from "../components/ToDoForm";
import renderer from "react-test-renderer";

/*
jest.mock("../components/Items", () => ({
  __esModule: true,
  Items: jest.fn(() => <div>Items</div>),
}));

jest.mock("../components/ToDoForm", () => ({
  __esModule: true,
  ToDoForm: jest.fn(() => <input type={"text"} />),
}));
*/

jest.mock("../components/Items", () => ({
  Items: () => {
    return <div></div>;
  },
}));

jest.mock("../components/ToDoForm", () => ({
  ToDoForm: () => {
    return <mock-input />;
  },
}));

const mockItems = mocked(Items);
const mockToDoForm = mocked(ToDoForm);

const mockToDone = jest.fn();
const mockAddItem = jest.fn();

test("It should display title in h1", () => {
  const item1 = { id: 1, nom: "Do test with jest", isComplet: false };
  const item2 = { id: 2, nom: "Do test homework", isComplet: false };

  render(<List title={"TO DO"} itemList={[item1, item2]} />);
  const title = screen.getByText("TO DO");
  expect(title.tagName.toLowerCase()).toBe("h1");
});

test("It should display the input textbox if the title is TO DO", () => {
  const item1 = { id: 1, nom: "Do test with jest", isComplet: false };
  const item2 = { id: 2, nom: "Do test homework", isComplet: false };

  render(
    <List
      title={"TO DO"}
      itemList={[item1, item2]}
      actionCheck={mockToDone}
      onSumbitAction={mockAddItem}
    />
  );
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});

test("It should not display the input textbox if the title is different from TO DO", () => {
  const item1 = { id: 1, nom: "Do test with jest", isComplet: true };
  const item2 = { id: 2, nom: "Do test homework", isComplet: true };

  render(
    <List
      title={"DONE"}
      itemList={[item1, item2]}
      actionCheck={mockToDone}
      onSumbitAction={mockAddItem}
    />
  );
  expect(screen.queryByRole("textbox")).toBeNull();
});

test("It should display the list of items", () => {
  const item1 = { id: 1, nom: "Do test with jest", isComplet: true };
  const item2 = { id: 2, nom: "Do test homework", isComplet: true };

  render(
    <List
      title={"DONE"}
      itemList={[item1, item2]}
      actionCheck={mockToDone}
      onSumbitAction={mockAddItem}
    />
  );
  expect(mockItems).toHaveBeenCalledTimes(2);
});

it("renders list of TO DO", () => {
  const item1 = { id: 1, nom: "Do test with jest", isComplet: true };
  const item2 = { id: 2, nom: "Do test homework", isComplet: true };
  const component = renderer.create(
    <List
      title={"DONE"}
      itemList={[item1, item2]}
      actionCheck={mockToDone}
      onSumbitAction={mockAddItem}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
