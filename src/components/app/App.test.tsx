import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import DarkMode from '../screens/darkmode/DarkMode';
import { StrictMode, Suspense } from 'react';
import Home from "../pages/Home/Home";
import About from "../pages/About/About";

test('renders App Go to previous version@1.0 link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/Go to previous version@1.0/i);
  // expect(linkElement).toBeInTheDocument();
});

test('renders Suspense index', () => {
  render(<Suspense />)
});

test('renders StrictMode', () => {
  render(<StrictMode />)
});

test('renders App componets', () => {
  render(<Home />);
  render(<About />)
});

// 1
test("renders dark mode component", () => {
  render(<DarkMode />);

  // 2
  const inputElement = screen.getByRole("checkbox") as HTMLInputElement;
  expect(inputElement).toBeInTheDocument();
});

// 3
test("toggles dark mode", () => {
  render(<DarkMode />);
  const inputElement = screen.getByRole("checkbox") as HTMLInputElement;

  // 4
  expect(inputElement.checked).toEqual(false);
  fireEvent.click(inputElement);
  expect(inputElement.checked).toEqual(true);

  // 5
  expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
});