import { render, screen } from "@testing-library/react";
import Items from "../components/Items";
import { mocked } from "jest-mock";
import List from "../components/List";
import ToDoForm from "../components/ToDoForm";
import renderer from "react-test-renderer";

jest.mock("../components/Items", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Items</div>),
}));

jest.mock("../components/ToDoForm", () => ({
  __esModule: true,
  default: jest.fn(() => <div>ToDoForm</div>),
}));

const mockItems = mocked(Items);
const mockToDoForm = mocked(ToDoForm);

const mockToDone = jest.fn();
const mockAddItem = jest.fn();

describe("List", () => {
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

    expect(mockToDoForm).toBeCalledTimes(1);
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

  test("It should display one item", () => {
    const item1 = { id: 1, nom: "Do test with jest", isComplet: true };
    render(
      <List
        title={"DONE"}
        itemList={[item1]}
        actionCheck={mockToDone}
        onSumbitAction={mockAddItem}
      />
    );
    expect(mockItems).toHaveBeenCalledTimes(1);
  });

  test("It should display many items", () => {
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
    const item1 = { id: 1, nom: "Do test with jest", isComplet: false };
    const item2 = { id: 2, nom: "Do test homework", isComplet: false };
    const component = renderer.create(
      <List
        title={"TO DO"}
        itemList={[item1, item2]}
        actionCheck={mockToDone}
        onSumbitAction={mockAddItem}
      />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders list of DONE", () => {
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
});
