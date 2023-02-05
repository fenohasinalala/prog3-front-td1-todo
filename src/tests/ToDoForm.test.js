import { render, fireEvent, screen } from "@testing-library/react";
import ToDoForm from "../components/ToDoForm";
import renderer from "react-test-renderer";

test("It should show Item name", () => {
  const item1 = { id: 1, nom: "Do test with jest", isComplet: false };
  render(<Items itemInfo={item1} />);
  const todo = screen.getByText("Do test with jest");
  expect(todo).toBeInTheDocument();
});

test("It should show checkBox for None Completed Item", () => {
  const item1 = { id: 1, nom: "Do test with jest", isComplet: false };
  render(<Items itemInfo={item1} />);
  const ckeckbox = screen.getByRole("checkbox");
  expect(ckeckbox).toBeInTheDocument();
  expect(ckeckbox).not.toBeChecked();
});

test("It shouldn't show checkBox for completed Item", () => {
  const item1 = { id: 1, nom: "Do test with jest", isComplet: true };
  render(<Items itemInfo={item1} />);
  expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
});

test("It should use props function when click the checkbox", () => {
  const mockActionClick = jest.fn();
  const item1 = { id: 1, nom: "Do test with jest", isComplet: false };
  render(<Items itemInfo={item1} actionClick={mockActionClick} />);
  const ckeckbox = screen.getByRole("checkbox");
  fireEvent.click(ckeckbox);
  expect(mockActionClick.mock.calls.length).toBe(1);
});

it("renders one none completed Item", () => {
  const mockActionClick = jest.fn();
  const item1 = { id: 1, nom: "Do test with jest", isComplet: false };
  const component = renderer.create(
    <Items itemInfo={item1} actionClick={mockActionClick} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders one completed Item", () => {
  const mockActionClick = jest.fn();
  const item1 = { id: 1, nom: "Do test with jest", isComplet: true };
  const component = renderer.create(
    <Items itemInfo={item1} actionClick={mockActionClick} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
