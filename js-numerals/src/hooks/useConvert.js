import { NUMBERS_STRINGS, SUFFIXES } from "../constants";

const noop = () => {};

export default function useConvert(number) {
  if (number) {
    if (NUMBERS_STRINGS.hasOwnProperty(number)) {
      return NUMBERS_STRINGS[number];
    }

    const stringifiedNumber = number.toString();
    const finalNumber = [];

    if (stringifiedNumber.length % 3 === 0) {
      const blocksOfHundreds = stringifiedNumber.match(/.{1,3}/g);
      const blocksOfHundredsCopy = [...blocksOfHundreds];

      for (const [index, block] of blocksOfHundreds.entries()) {
        finalNumber.push(NUMBERS_STRINGS[parseInt(block[0])] + " ");
        finalNumber.push(SUFFIXES.HUNDRED + " and ");

        if (parseInt(block[1]) !== 0) {
          const dicker = block[1] + block[2];
          if (NUMBERS_STRINGS.hasOwnProperty(parseInt(dicker))) {
            finalNumber.push(NUMBERS_STRINGS[parseInt(dicker)]);
          } else {
            const dickerPrefix = block[1] + "0";
            finalNumber.push(
              `${NUMBERS_STRINGS[dickerPrefix]} ${
                NUMBERS_STRINGS[parseInt(block[2])]
              }`
            );
          }
        }

        if (index !== blocksOfHundreds.length - 1) {
          switch (blocksOfHundredsCopy.length) {
            case 2:
              finalNumber.push(` ${SUFFIXES.THOUSAND} `);
              break;
            case 3:
              finalNumber.push(` ${SUFFIXES.MILLION} `);
              break;
            case 4:
              finalNumber.push(` ${SUFFIXES.BILLION} `);
              break;
            case 5:
              finalNumber.push(` ${SUFFIXES.TRILLION} `);
              break;
            default:
              noop();
          }
          blocksOfHundredsCopy.pop();
          finalNumber.push(" and ");
        }
      }
    }

    return finalNumber;
  }
}
