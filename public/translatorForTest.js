import { americanOnly } from "./american-only.js";
import { britishOnly } from "./british-only.js";
import { americanToBritishSpelling } from "./american-to-british-spelling.js";
import { americanToBritishTitles } from "./american-to-british-titles.js";

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/

console.log("translator module run!");


/*Translator Function*/
function translate(originalText, originalDialect) {
  //transform to array and checking
  const originalTextArr = originalText.split(" ");
  console.log(originalTextArr);

  /* Basic Idea for Algorithm 
      pre: split dictionary ARRAY to check for spaced word /
      pre: observe special case /
      Validation : empty text filed? ----> return error message to #error-div

      if{
        1. Check against  americanToBritishTitles ARRAY
        2. Check for time format
        continue;
      }else{
        3. Deal with "." in Original ARRAY (Extract with Regexp)
        4. Check if all member of array is British or American Specific
        5. Check against american-to-british-spelling(use Quick Sort) *Handle special case here
      }
  */
  // let translateText =
  //   "\nOriginal Text : " +
  //   originalText +
  //   "\nFrom - to :  " +
  //   originalDialect +
  //   "\n\n";

  let tranlatedArray;
  if (originalDialect === "american-to-british") {
    tranlatedArray = originalTextArr.map(word => {
      // let translateWord = word;
      console.log("Searching for word from american-to-british");
      console.log(americanToBritishSpelling[word.toLowerCase()]);
      if (americanToBritishTitles[word.toLowerCase()]) {
        return americanToBritishTitles[word.toLowerCase()];
      } else if (/^[01][123456789]:[01][123456789]$/.test(word)) {
        console.log("regex test");
        return word.replace(":", ".");
      } else if (americanOnly[word.toLowerCase()]) {
        return americanOnly[word.toLowerCase()];
      } else if (americanToBritishSpelling[word.toLowerCase()]) {
        console.log(
          word,
          " --to British--> ",
          americanToBritishSpelling[word.toLowerCase()]
        );
        return americanToBritishSpelling[word.toLowerCase()];
      }
      return word;
    });
  } else if (originalDialect === "british-to-american") {
    console.log("Searching for word from british-to-american");

    //swaped
    let britishToAmericanSpelling = {};
    for (const [key, value] of Object.entries(americanToBritishSpelling)) {
      britishToAmericanSpelling[value] = key;
    }
    console.log("British to American : ", britishToAmericanSpelling);

    tranlatedArray = originalTextArr.map(word => {
      console.log(britishToAmericanSpelling[word.toLowerCase()]);
      if (americanToBritishTitles[word.toLowerCase()]) {
        return americanToBritishTitles[word.toLowerCase()];
      } else if (/^[01][123456789].[01][123456789]$/.test(word)) {
        console.log("regex test");
        return word.replace(".", ":");
      } else if (americanOnly[word.toLowerCase()]) {
        return britishOnly[word.toLowerCase()];
      } else if (britishToAmericanSpelling[word.toLowerCase()]) {
        console.log(
          word,
          " --to British--> ",
          britishToAmericanSpelling[word.toLowerCase()]
        );
        return britishToAmericanSpelling[word.toLowerCase()];
      }
      return word;
    });
  }
  console.log("Translated Array : ", tranlatedArray);


  console.log(
    "Translate function args ,",
    originalText,
    "   Dialect",
    originalDialect
  );

  return tranlatedArray.join(" ")
}

/*END Translator Function*/

try {
  module.exports = translate;
} catch (e) {}
