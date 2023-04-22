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

//Translate Area
let translateDiv = document.getElementById("translated-sentence");
let errorDiv = document.getElementById("error-msg");

/* 2.Dom manipulation */
//Textarea Input & Btn
let textInput = document.getElementById("text-input");
console.log(textInput.textContent);

let translateButton = document.getElementById("translate-btn");
console.log(translateButton);
translateButton.addEventListener("click", function(event) {
  console.log(event);
  const dialect = document.getElementById("locale-select").value;
  const textToTranslate = document.getElementById("text-input").value;

  let translatedNode = document.createElement("div");

  //input validation
  document.getElementById("text-input").value === ""
    ? errorDiv.append("Error: No text to translate.")
    : translate(textToTranslate, dialect) === "Everything looks good to me!"
    ? (translatedNode.innerHTML = "Everything looks good to me!")
    : (translatedNode.innerHTML = spanWrapper(
        textToTranslate,
        translate(textToTranslate, dialect)
      ));

  translateDiv.appendChild(translatedNode);
});

let clearButton = document.getElementById("clear-btn");
console.log(clearButton);
clearButton.addEventListener("click", function(event) {
  document.getElementById("text-input").textContent = "";
  document.getElementById("translated-sentence").textContent = "";
  document.getElementById("error-msg").textContent = "";
  console.log(event);
});

/* END Dom manipulation */

//----------------------------------

/*Translator Function*/
function translate(originalText, originalDialect,lodash) {
  //transform to array and checking
  
  const originalTextArr = originalText.split(" ");
  console.log(originalTextArr);

  //swaped
  let britishToAmericanSpelling = {};
  for (const [key, value] of Object.entries(americanToBritishSpelling)) {
    britishToAmericanSpelling[value] = key;
  }
  let britishToAmericanTitles = {};
  for (const [key, value] of Object.entries(americanToBritishTitles)) {
    britishToAmericanTitles[value] = key;
  }

  //Edge case is case that have more than 1 syllable
  let americanSpellingEdgeCase = {};
  for (const [key, value] of Object.entries(americanToBritishSpelling)) {
    if (key.split(" ").length > 1) americanSpellingEdgeCase[key] = value;
  }
  let britishSpellingEdgeCase = {};
  for (const [key, value] of Object.entries(americanToBritishSpelling)) {
    if (key.split(" ").length > 1) britishSpellingEdgeCase[value] = key;
  }
  let britishEdgeCase = {};
  for (const [key, value] of Object.entries(britishOnly)) {
    if (key.split(" ").length > 1) britishEdgeCase[key] = value;
  }
  let americanEdgeCase = {};
  for (const [key, value] of Object.entries(americanOnly)) {
    if (key.split(" ").length > 1) americanEdgeCase[key] = value;
  }

  let britAllEdgeCase = Object.assign(
    {},
    britishSpellingEdgeCase,
    britishEdgeCase
  );

  let americanAllEdgeCase = Object.assign(
    {},
    americanSpellingEdgeCase,
    americanEdgeCase
  );
  // console.log(edgeCase);

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

  let translatedArray = {};
  let translatedText;

  if (originalDialect === "american-to-british") {
    translatedArray = originalTextArr.map(word => {
      // let translateWord = word;
      // console.log("Searching for word from american-to-british");
      // console.log(americanToBritishSpelling[word.toLowerCase()]);
      // console.log("Word : ",word)
      if (americanToBritishTitles[word.toLowerCase()]) {
        return lodash.capitalize(americanToBritishTitles[word.toLowerCase()]);
      }
      //remove "."
      let transformWord =
        word.indexOf(".") !== -1 ? word.replace(".", "") : word;

      if (/^[012][123456789]:[012345][0123456789]$/.test(transformWord)) {
        // console.log("regex test");
        return word.indexOf(".") !== -1
          ? transformWord.replace(":", ".") + "."
          : transformWord.replace(":", ".");
      } else if (americanOnly[transformWord.toLowerCase()]) {
        console.log(
          "american only word ,",
          americanOnly[transformWord.toLowerCase()]
        );
        return word.indexOf(".") !== -1
          ? americanOnly[transformWord.toLowerCase()] + "."
          : americanOnly[transformWord.toLowerCase()];
      } else if (americanToBritishSpelling[transformWord.toLowerCase()]) {
        console.log(
          "american only word ,",
          americanToBritishSpelling[transformWord.toLowerCase()]
        );
        return word.indexOf(".") !== -1
          ? americanToBritishSpelling[transformWord.toLowerCase()] + "."
          : americanToBritishSpelling[transformWord.toLowerCase()];
      }

      return word;
    });

    translatedText = translatedArray.join(" ");

    for (let [key, value] of Object.entries(americanAllEdgeCase)) {
      let findMatch = new RegExp(key, "i");
      if (findMatch.test(translatedText)) {
        translatedText = translatedText.replace(findMatch, value);
      }
    }
    //console.log("Before edgeCase line of american-to-british translator : ",translatedText)
    //Handling Edge Case the one that have more than one syllable

    // console.log("Last line of american-to-british translator : ",Object.entries(edgeCase))
  } else if (originalDialect === "british-to-american") {
    // console.log("Searching for word from british-to-american");

    // console.log("British to American : ", britishToAmericanSpelling);

    translatedArray = originalTextArr.map(word => {
      // console.log(britishToAmericanSpelling[word.toLowerCase()]);
      if (britishToAmericanTitles[word.toLowerCase()]) {
        return lodash.capitalize(britishToAmericanTitles[word.toLowerCase()]);
      }

      let transformWord =
        word.indexOf(".") !== -1 ? word.replace(".", "") : word;

      if (/^[012][123456789]:[012345][0123456789]$/.test(transformWord)) {
        // console.log("regex test");
        return word.indexOf(".") !== -1
          ? transformWord.replace(":", ".") + "."
          : transformWord.replace(":", ".");
      } else if (britishOnly[transformWord.toLowerCase()]) {
        return word.indexOf(".") !== -1
          ? britishOnly[transformWord.toLowerCase()] + "."
          : britishOnly[transformWord.toLowerCase()];
      } else if (britishToAmericanSpelling[transformWord.toLowerCase()]) {
        return word.indexOf(".") !== -1
          ? britishToAmericanSpelling[transformWord.toLowerCase()] + "."
          : britishToAmericanSpelling[transformWord.toLowerCase()];
      }
      return word;
    });
    translatedText = translatedArray.join(" ");

    for (let [key, value] of Object.entries(britAllEdgeCase)) {
      let findMatch = new RegExp(key, "i");
      if (
        findMatch.test(translatedText) &&
        translatedText.indexOf("fish-and-chip") === -1
      ) {
        translatedText = translatedText.replace(findMatch, value);
      }
    }
  }

  // console.log(Object.entries(edgeCase))

  console.log("Translated Array : ", translatedArray);
  console.log("Original : ", originalText, " ,  Dialect : ", originalDialect);
  console.log("Result sentence : ", translatedText);
  let originalRegex = new RegExp("^" + originalText + "$");
  console.log("Same as original : ", originalRegex.test(translatedText));

  return originalRegex.test(translatedText)
    ? "Everything looks good to me!"
    : translatedText;
  // console.log("----- Observation of Dictionary ARRAY -----");
  // console.log("**British Only**");
  // console.log("British only array length : ", Object.keys(britishOnly).length);
  // console.log(
  //   "British only that have more than one syllable : ",
  //   Object.keys(britishOnly).filter(element =>
  //     element.split(" ").length > 1 ? true : false
  //   )
  // );
  // console.log("**American Only**");
  // console.log(
  //   "American only array length : ",
  //   Object.keys(americanOnly).length
  // );
  // console.log(
  //   "American only that have more than one syllable : ",
  //   Object.keys(americanOnly).filter(element =>
  //     element.split(" ").length > 1 ? true : false
  //   )
  // );
  // console.log("**American to British Spelling**");
  // console.log(
  //   "American to British array length : ",
  //   Object.keys(americanToBritishSpelling).length
  // );
  // console.log(
  //   "American to British that have more than one syllable : ",
  //   Object.keys(americanToBritishSpelling).filter(element =>
  //     element.split(" ").length > 1 ? true : false
  //   )
  // );
}

/*END Translator Function*/

//<span> wrapper
function spanWrapper(originalText, comparedText) {
  const comparedTextArr = comparedText.split(" ");
  // console.log("Original : ",originalText)
  // console.log("Translated : ",comparedText)

  return comparedTextArr
    .map(word => {
      const testWordRegex = new RegExp("\\b" + word + "(\\b|$)", "i");
      // console.log()
      // console.log("testWordRegex : ",testWordRegex, "Presence? : ",testWordRegex.test(originalText))
      return testWordRegex.test(originalText)
        ? word //  console.log("This word : >>", word, "<< is translated.")
        : '<span class="highlight">' + word + "</span>"; //  console.log("x", word);
    })
    .join(" ");
}
try {
  module.exports = { translate, spanWrapper };
} catch (e) {}
