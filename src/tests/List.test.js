import { render, screen } from "@testing-library/react";
import Items from "../components/Items";
import { mocked } from "jest-mock";
import List from "../components/List";
import ToDoForm from "../components/ToDoForm";
import renderer from "react-test-renderer";

const mockItems = jest.fn();
const mockToDoForm = mocked(ToDoForm);

jest.mock("../components/Items", () => (props) => {
  mockItems(props);
  return <mock-Items />;
});

jest.mock("../components/ToDoForm", () => ({
  __esModule: true,
  default: jest.fn(() => <div>ToDoForm</div>),
}));

const mockToDone = jest.fn();
const mockAddItem = jest.fn();

const item1 = { id: 1, nom: "Do test with jest", isComplet: false };
const item2 = { id: 2, nom: "Do test homework", isComplet: false };

describe("List", () => {
  test("It should display the input textbox if the title is TO DO", () => {
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
    render(
      <List
        title={"DONE"}
        itemList={[item1]}
        actionCheck={mockToDone}
        onSumbitAction={mockAddItem}
      />
    );
    expect(mockItems).toHaveBeenCalledTimes(1);
    expect(mockItems).toHaveBeenCalledWith(
      expect.objectContaining({
        itemInfo: { id: 1, nom: "Do test with jest", isComplet: false },
      })
    );
  });

  test("It should display many items", () => {
    render(
      <List
        title={"DONE"}
        itemList={[item1, item2]}
        actionCheck={mockToDone}
        onSumbitAction={mockAddItem}
      />
    );
    expect(mockItems).toHaveBeenCalledTimes(2);
    expect(mockItems).toHaveBeenCalledWith(
      expect.objectContaining({
        itemInfo: { id: 1, nom: "Do test with jest", isComplet: false },
      })
    );
    expect(mockItems).toHaveBeenCalledWith(
      expect.objectContaining({
        itemInfo: { id: 2, nom: "Do test homework", isComplet: false },
      })
    );
  });

  it("renders list of TO DO", () => {
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
