/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
const assert = chai.assert;
const lodash = require("lodash");

let translator;
let spanWrapper;
suite("Functional Tests", () => {
  suiteSetup(() => {
    // DOM already mocked -- load translator then run tests
    translator = require("../public/translator.js").translate;
    spanWrapper = require("../public/translator.js").spanWrapper;
  });

  suite("Function ____()", () => {
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    test("Translation appended to the `translated-sentence` `div`", done => {
      const originalText = document.getElementById("text-input").textContent
      const originalDialect = "american-to-british"

      const translatedText = translator(originalText,originalDialect) 
      const spanWrapTranslated = spanWrapper(originalText,translatedText)

      //simulate click on #translate-btn
      document.getElementById("translate-btn").click();

      let translatedDivHTML = document.getElementById("translated-sentence")
        .children["0"].innerHTML;

        console.log("Functional test 01. :",translatedDivHTML)
      assert.equal(translatedDivHTML.toString(),spanWrapTranslated.toString())

      done();
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {
      //simulate click on #clear 
      document.getElementById("clear-btn").click();
      
      document.getElementById("text-input").textContent = "Everything"
      const originalText = document.getElementById("text-input").textContent
      const originalDialect = "american-to-british"

      const translatedText = translator(originalText,originalDialect) 
      

      console.log("Original Text : ",originalText)

      //simulate click on £translate-btn
      document.getElementById("translate-btn").click();

      let translatedDivHTML = document.getElementById("translated-sentence")
        .children["0"].innerHTML
      
      assert.equal(translatedDivHTML,translatedText)

      done();
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {
      document.getElementById("clear-btn").click();
      document.getElementById("translate-btn").click();

      assert.equal(document.getElementById("error-msg").innerHTML,"Error: No text to translate.")
      done();
    });
  });

  suite("Function ____()", () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
      document.getElementById("clear-btn").click();

      assert.equal(document.getElementById("text-input").innerHTML,"")
      assert.equal(document.getElementById("translated-sentence").innerHTML,"")
      assert.equal(document.getElementById("error-msg").innerHTML,"")

      done();
    });
  });
});
