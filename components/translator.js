const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const translationListAmToBr = []
Object.keys(americanOnly).forEach((key) =>{
	translationListAmToBr.push([
		key, 
    americanOnly[key]
	])
})
Object.keys(americanToBritishSpelling).forEach((key) =>{
	translationListAmToBr.push([
		key,
		americanToBritishSpelling[key]
	])
})

const translationListBrToAm = [];

Object.keys(americanToBritishSpelling).forEach((key) =>{
	translationListBrToAm.push([
		americanToBritishSpelling[key],
		key
	])
})
Object.keys(britishOnly).forEach((key) =>{
	translationListBrToAm.push([
		key,
		britishOnly[key]
	])
})

const translationTitles = [];
Object.keys(americanToBritishTitles).forEach((key) =>{
	translationTitles.push([
		key,
		americanToBritishTitles[key]
	])
})

//translationList : américain -> anglais

class Translator {

  constructor(){
    this.upperCase = this.upperCase.bind(this)
  }
  
  colorize(word){
    return '<span class="highlight">' + word + '</span>';
  }

  upperCase(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  /*matchCase(text, pattern) {
    var result = '';

    for(var i = 0; i < text.length; i++) {
        var c = text.charAt(i);
        var p = pattern.charCodeAt(i);

        if(p >= 65 && p < 65 + 26) {
            result += c.toUpperCase();
        } else {
            result += c.toLowerCase();
        }
    }

    return result;
  }*/

  translate(text, mode){

    let newString = text;

    //Translation of titles
    if(mode === "american-to-british"){
      //american title : Mr.
      translationTitles.forEach(translation => {
        //let regWord = new RegExp('mr\.|mrs\.|ms\.|mx\.|dr\.|prof\.', 'gi');
        let regWord = new RegExp('(?<![\\w-])('+translation[1]+'\\.)(?![\\w-])', 'gi');
        newString = newString.replace(regWord, this.upperCase(translation[1]));
      });
    } else {
      translationTitles.forEach(translation => {
        let regWord = new RegExp('(?<![\\w-])'+translation[1]+'(?![\\w-])', 'gi');
        newString = newString.replace(regWord, this.upperCase(translation[0]));
      });
    }

    //Translations of other words
    if(mode === "american-to-british"){
      translationListAmToBr.forEach(translation => {
        //let regWord = new RegExp("(?<=\s|^)("+translation[0]+")(?=\s|$)", "gi");
        let regWord = new RegExp('(?<![\\w-])'+translation[0]+'(?![\\w-])', 'gi');
        newString = newString.replace(regWord, translation[1]);
      });
    } else {
      translationListBrToAm.forEach(translation => {
        //let regWord = new RegExp("(?<=\s|^)("+translation[0]+")(?=\s|$)", "gi");
        let regWord = new RegExp('(?<![\\w-])'+translation[0]+'(?![\\w-])', 'gi');
        newString = newString.replace(regWord, translation[1]);
      });
    }

    //Translation of time
    const regTimeBr = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(\.)([0-5][0-9]))/g
    const regTimeAm = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:)([0-5][0-9]))/g
    if(mode === "american-to-british"){
      let times = newString.match(regTimeAm);
      if(times){
        times.forEach((time) => {
          newString = newString.replace(time, time.replace(":", "."));
        });
      }
    } else {
      let times = newString.match(regTimeBr);
      if(times){
        times.forEach((time) => {
          newString = newString.replace(time, time.replace(".", ":"));
        });
      }
    }
    return newString;

  }

  translateAndHighlight(text, mode){

    let newString = text;

    //Translation of titles
    if(mode === "american-to-british"){
      //american title : Mr.
      translationTitles.forEach(translation => {
        //let regWord = new RegExp('mr\.|mrs\.|ms\.|mx\.|dr\.|prof\.', 'gi');
        let regWord = new RegExp('(?<![\\w-])('+translation[1]+'\\.)(?![\\w-])', 'gi');
        newString = newString.replace(regWord, this.colorize(this.upperCase(translation[1])));
      });
    } else {
      translationTitles.forEach(translation => {
        let regWord = new RegExp('(?<![\\w-])'+translation[1]+'(?![\\w-])', 'gi');
        newString = newString.replace(regWord, this.colorize(this.upperCase(translation[0])));
      });
    }

    //Translations of other words
    if(mode === "american-to-british"){
      translationListAmToBr.forEach(translation => {
        //let regWord = new RegExp("(?<=\s|^)("+translation[0]+")(?=\s|$)", "gi");
        let regWord = new RegExp('(?<![\\w-])'+translation[0]+'(?![\\w-])', 'gi');
        newString = newString.replace(regWord, this.colorize(translation[1]));
      });
    } else {
      translationListBrToAm.forEach(translation => {
        //let regWord = new RegExp("(?<=\s|^)("+translation[0]+")(?=\s|$)", "gi");
        let regWord = new RegExp('(?<![\\w-])'+translation[0]+'(?![\\w-])', 'gi');
        newString = newString.replace(regWord, this.colorize(translation[1]));
      });
    }

    //Translation of time
    const regTimeBr = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(\.)([0-5][0-9]))/g
    const regTimeAm = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:)([0-5][0-9]))/g
    if(mode === "american-to-british"){
      let times = newString.match(regTimeAm);
      if(times){
        times.forEach((time) => {
          newString = newString.replace(time, this.colorize(time.replace(":", ".")));
        });
      }
    } else {
      let times = newString.match(regTimeBr);
      if(times){
        times.forEach((time) => {
          newString = newString.replace(time, this.colorize(time.replace(".", ":")));
        });
      }
    }
    return newString;

  }
}

module.exports = Translator;