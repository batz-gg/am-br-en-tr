const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const translator = new Translator();

suite('Unit Tests', () => {
  suite('basic translation', () => {
    test('translation simple word american to british', function(done){
      const toTranslate = "Mangoes are my favorite fruit.";
      const translation = 'Mangoes are my favourite fruit.';
      const mode = "american-to-british";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation simple word american to british', function(done){
      const toTranslate = "I ate yogurt for breakfast.";
      const translation = 'I ate yoghurt for breakfast.';
      const mode = "american-to-british";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation simple word american to british', function(done){
      const toTranslate = "We had a party at my friend's condo.";
      const translation = "We had a party at my friend's flat.";
      const mode = "american-to-british";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation simple word american to british', function(done){
      const toTranslate = "Can you toss this in the trashcan for me?";
      const translation = 'Can you toss this in the bin for me?';
      const mode = "american-to-british";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation 2 words american to british', function(done){
      const toTranslate = "The parking lot was full.";
      const translation = 'The car park was full.';
      const mode = "american-to-british";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation several words american to british', function(done){
      const toTranslate = "Like a high tech Rube Goldberg machine.";
      const translation = 'Like a high tech Heath Robinson device.';
      const mode = "american-to-british";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation several words american to british', function(done){
      const toTranslate = "To play hooky means to skip class or work.";
      const translation = 'To bunk off means to skip class or work.';
      const mode = "american-to-british";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation title american to british', function(done){
      const toTranslate = "No Mr. Bond, I expect you to die.";
      const translation = 'No Mr Bond, I expect you to die.';
      const mode = "american-to-british";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation title american to british', function(done){
      const toTranslate = "Dr. Grosh will see you now.";
      const translation = 'Dr Grosh will see you now.';
      const mode = "american-to-british";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation time american to british', function(done){
      const toTranslate = "Lunch is at 12:15 today.";
      const translation = 'Lunch is at 12.15 today.';
      const mode = "american-to-british";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation 1 word british to american', function(done){
      const toTranslate = "We watched the footie match for a while.";
      const translation = 'We watched the soccer match for a while.';
      const mode = "british-to-american";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation 1 word british to american', function(done){
      const toTranslate = "Paracetamol takes up to an hour to work.";
      const translation = 'Tylenol takes up to an hour to work.';
      const mode = "british-to-american";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation 1 word american to british', function(done){
      const toTranslate = "First, caramelise the onions.";
      const translation = 'First, caramelize the onions.';
      const mode = "british-to-american";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation 2x1 word american to british', function(done){
      const toTranslate = "I spent the bank holiday at the funfair.";
      const translation = 'I spent the public holiday at the carnival.';
      const mode = "british-to-american";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation 2x1 word american to british', function(done){
      const toTranslate = "I had a bicky then went to the chippy.";
      const translation = 'I had a cookie then went to the fish-and-chip shop.';
      const mode = "british-to-american";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation several words american to british', function(done){
      const toTranslate = "I've just got bits and bobs in my bum bag.";
      const translation = "I've just got odds and ends in my fanny pack.";
      const mode = "british-to-american";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation 2 words american to british', function(done){
      const toTranslate = "The car boot sale at Boxted Airfield was called off.";
      const translation = 'The swap meet at Boxted Airfield was called off.';
      const mode = "british-to-american";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation title american to british', function(done){
      const toTranslate = "Have you met Mrs Kalyani?";
      const translation = 'Have you met Mrs. Kalyani?';
      const mode = "british-to-american";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation title british to american', function(done){
      const toTranslate = "Prof Joyner of King's College, London.";
      const translation = "Prof. Joyner of King's College, London.";
      const mode = "british-to-american";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });

    test('translation time british to american', function(done){
      const toTranslate = "Tea time is usually around 4 or 4.30.";
      const translation = 'Tea time is usually around 4 or 4:30.';
      const mode = "british-to-american";
      assert.equal(translator.translate(toTranslate, mode), translation);
      done();
    });
  });

  suite('Translation with highlights', () => {
    test('highlight translation of 1 word american to british', function(done){
      const toTranslate = "Mangoes are my favorite fruit."
      const translation = 'Mangoes are my <span class="highlight">favourite</span> fruit.'
      const mode = "american-to-british";
      assert.equal(translator.translateAndHighlight(toTranslate, mode), translation);
      done();
    });

    test('highlight translation of 1 word american to british 2', function(done){
      const toTranslate = "I ate yogurt for breakfast."
      const translation = 'I ate <span class="highlight">yoghurt</span> for breakfast.'
      const mode = "american-to-british";
      assert.equal(translator.translateAndHighlight(toTranslate, mode), translation);
      done();
    });

    test('highlight translation of 1 word british to american', function(done){
      const toTranslate = "We watched the footie match for a while."
      const translation = 'We watched the <span class="highlight">soccer</span> match for a while.'
      const mode = "british-to-american";
      assert.equal(translator.translateAndHighlight(toTranslate, mode), translation);
      done();
    });

    test('highlight translation of 1 word british to american 2', function(done){
      const toTranslate = "Paracetamol takes up to an hour to work."
      const translation = '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      const mode = "british-to-american";
      assert.equal(translator.translateAndHighlight(toTranslate, mode), translation);
      done();
    });
  });

});
