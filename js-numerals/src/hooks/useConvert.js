import { NUMBERS_STRINGS, SUFFIXES } from "../constants";

const noop = () => {};

const pushItem = (array, item) => array.push(item);

function divide(stringifiedNumber, finalNumber) {
  const blocksOfHundreds = stringifiedNumber.match(/.{1,3}/g);
  const blocksOfHundredsCopy = [...blocksOfHundreds];

  for (const [index, block] of blocksOfHundreds.entries()) {
    finalNumber.push(NUMBERS_STRINGS[parseInt(block[0])] + " ");
    finalNumber.push(SUFFIXES.HUNDRED + " ");

    convert(block, 1, finalNumber);
    addSuffixPerBlock(
      index,
      { blocksOfHundreds, blocksOfHundredsCopy },
      finalNumber
    );
  }

  return finalNumber;
}

function convert(block, index, finalNumber) {
  if (parseInt(block[index]) !== 0) {
    const dicker = block[index] + block[index + 1];
    if (NUMBERS_STRINGS.hasOwnProperty(parseInt(dicker))) {
      return pushItem(finalNumber, NUMBERS_STRINGS[parseInt(dicker)]);
    } else {
      const dickerPrefix = block[index] + "0";
      return pushItem(
        finalNumber,
        `${NUMBERS_STRINGS[dickerPrefix]}-${
          NUMBERS_STRINGS[parseInt(block[index + 1])]
        }`
      );
    }
  }
}

function addSuffix(stringArray, finalNumber, operation) {
  switch (stringArray.length) {
    case 2:
      operation === "push"
        ? finalNumber.push(` ${SUFFIXES.THOUSAND} `)
        : finalNumber.unshift(` ${SUFFIXES.THOUSAND} `);
      break;
    case 3:
      operation === "push"
        ? finalNumber.push(` ${SUFFIXES.MILLION} `)
        : finalNumber.unshift(` ${SUFFIXES.MILLION} `);
      break;
    case 4:
      operation === "push"
        ? finalNumber.push(` ${SUFFIXES.BILLION} `)
        : finalNumber.unshift(` ${SUFFIXES.BILLION} `);
      break;
    case 5:
      operation === "push"
        ? finalNumber.push(` ${SUFFIXES.TRILLION} `)
        : finalNumber.unshift(` ${SUFFIXES.TRILLION} `);
      break;
    default:
      noop();
  }

  return finalNumber;
}

function addFirstSuffix(arrays, finalNumber) {
  if (arrays.prefixArray.length === 1) {
    addSuffix(arrays.array, finalNumber, "unshift");
    finalNumber.unshift(NUMBERS_STRINGS[arrays.prefixArray[0]]);
  }

  return finalNumber;
}

function addSuffixPerBlock(index, blocks, finalNumber) {
  if (index !== blocks.blocksOfHundreds.length - 1) {
    addSuffix(blocks.blocksOfHundreds, finalNumber, "push");
    blocks.blocksOfHundredsCopy.pop();
  }

  return { blocks, finalNumber };
}

function addConnective(index, blocksOfHundreds, finalNumber) {
  if (index === blocksOfHundreds.length - 2) {
    finalNumber.push(" and ");
  }
}

function normalize(stringifiedNumber, finalNumber) {
  let stringifiedNumberArray = Array.from(stringifiedNumber);
  let stringifiedNumberArraySlice = stringifiedNumberArray.slice(
    0,
    stringifiedNumber.length % 3
  );

  stringifiedNumberArray.splice(0, stringifiedNumberArraySlice.length);
  stringifiedNumberArray = divide(stringifiedNumberArray.join(""), finalNumber);
  addFirstSuffix(
    { prefixArray: stringifiedNumberArraySlice, array: stringifiedNumberArray },
    finalNumber
  );

  return finalNumber;
}

export default function useConvert(number) {
  if (number) {
    if (NUMBERS_STRINGS.hasOwnProperty(number)) {
      return NUMBERS_STRINGS[number];
    }

    const stringifiedNumber = number.toString();
    let finalNumber = [];

    if (stringifiedNumber.length % 3 === 0) {
      divide(stringifiedNumber, finalNumber);
    } else if (stringifiedNumber.length < 3) {
      convert(stringifiedNumber, 0, finalNumber);
    } else {
      normalize(stringifiedNumber, finalNumber);
    }

    return finalNumber.join("");
  }
}
