import useConvert from "./useConvert";
import { NUMBERS_STRINGS } from "../constants";

test("return 1 digit number word", () => {
  const number = 7;
  expect(useConvert(number)).toMatch(NUMBERS_STRINGS[number]);
});

test("return 2 digit number word", () => {
  const number = 42;
  expect(useConvert(number)).toMatch("forty-two");
});

test("return 4 digit number word", () => {
  const number = 2001;
  expect(useConvert(number)).toMatch("two thousand and one");
});

test("return 4 digit number under two thousand word", () => {
  const number = 1999;
  expect(useConvert(number)).toMatch("nineteen hundred and ninety-nine");
});

test("return 5 digit number word", () => {
  const number = 17999;
  expect(useConvert(number)).toMatch(
    "seventeen thousand nine hundred and ninety-nine"
  );
});

test("return 6 digit number word", () => {
  const number = 342251;
  expect(useConvert(number)).toMatch(
    "three hundred and forty-two thousand two hundred and fifty-one"
  );
});

test("return 7 digit number word", () => {
  const number = 1300420;
  expect(useConvert(number)).toMatch(
    "one million three hundred thousand four hundred and twenty"
  );
});
