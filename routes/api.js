'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if(req.body.text == undefined || req.body.locale == undefined){
        return res.json({ error: 'Required field(s) missing' });
      }
      if(req.body.text === ""){
        return res.json({ error: 'No text to translate' });
      }
      if(req.body.locale != 'american-to-british' && req.body.locale != 'british-to-american'){
        return res.json({ error: 'Invalid value for locale field' });
      }
      const translatedText = translator.translateAndHighlight(req.body.text, req.body.locale);
      if(req.body.text === translatedText){
        return res.json({
          text: req.body.text,
          translation: "Everything looks good to me!"
        });
      } else {
        return res.status(200).json({
          text: req.body.text,
          translation: translatedText
        })
      }
    });
};
