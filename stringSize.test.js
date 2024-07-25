const add = require('./stringSize');

test('returns 0 for an empty string', () => {
  expect(add("")).toBe(0);
});

test('returns the number for a single number string', () => {
  expect(add("1")).toBe(1);
  expect(add("5")).toBe(5);
});

test('returns the sum for a two number string', () => {
  expect(add("1,2")).toBe(3);
  expect(add("5,7")).toBe(12);
});

test('returns the sum for multiple numbers', () => {
  expect(add("1,2,3,4")).toBe(10);
});

test('handles new lines between numbers', () => {
  expect(add("1\n2,3")).toBe(6);
});

test('supports different delimiters', () => {
  expect(add("//;\n1;2")).toBe(3);
});

test('throws an exception for negative numbers', () => {
  expect(() => add("1,-2,3")).toThrow("negative numbers not allowed -2");
});

test('shows all negative numbers in the exception message', () => {
  expect(() => add("1,-2,-3")).toThrow("negative numbers not allowed -2,-3");
});

test('handles multiple new lines', () => {
  expect(add("1\n2\n3")).toBe(6);
});

test('handles multiple different delimiters in one string', () => {
  expect(add("1,2\n3")).toBe(6);
});

test('handles single character delimiter with spaces', () => {
  expect(add("//;\n1; 2;3")).toBe(6);
});

test('handles long delimiters', () => {
  expect(add("//[***]\n1***2***3")).toBe(6);
});

test('handles delimiters with special characters', () => {
  expect(add("//[*$]\n1*$2*$3")).toBe(6);
});

test('handles multiple delimiters with different lengths', () => {
  expect(add("//[*][%%]\n1*2%%3")).toBe(6);
});

test('ignores numbers greater than 1000', () => {
  expect(add("2,1001")).toBe(2);
});

test('includes numbers exactly 1000', () => {
  expect(add("2,1000")).toBe(1002);
});

test('handles empty delimiters', () => {
  expect(add("//[]\n1,2")).toBe(3);
});

test('handles whitespace delimiters', () => {
  expect(add("//[ ]\n1 2 3")).toBe(6);
});

test('throws an exception for negative numbers with multiple delimiters', () => {
  expect(() => add("//[*][%]\n-1*2%-3")).toThrow("negative numbers not allowed -1,-3");
});

test('handles numbers with leading zeros', () => {
  expect(add("01,002")).toBe(3);
});
