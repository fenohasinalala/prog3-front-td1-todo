import { render, fireEvent, screen } from "@testing-library/react";
import ToDoForm from "../components/ToDoForm";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

test("It should show an Input textbox", () => {
  const mockOnSubmitAction = jest.fn();
  render(<ToDoForm onSubmitAction={mockOnSubmitAction} />);
  const input = screen.getByRole("textbox", /newTodo/i);
  expect(input).toBeInTheDocument();
});

test("It should call props function on submit if text lenght is higher than 0", () => {
  const mockOnSubmitAction = jest.fn();
  render(<ToDoForm onSubmitAction={mockOnSubmitAction} />);
  const input = screen.queryByRole("textbox", /newTodo/i);
  userEvent.type(input, "text{enter}");
  expect(mockOnSubmitAction).toBeCalledTimes(1);
});

test("It shouldn't call props function on submit if text lenght equals 0", () => {
  const mockOnSubmitAction = jest.fn();
  render(<ToDoForm onSubmitAction={mockOnSubmitAction} />);
  const input = screen.queryByRole("textbox", /newTodo/i);
  userEvent.type(input, "{enter}");
  expect(mockOnSubmitAction).not.toHaveBeenCalled();
});

it("renders list of TO DO", () => {
  const mockOnSubmitAction = jest.fn();
  const component = renderer.create(
    <ToDoForm onSubmitAction={mockOnSubmitAction} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
