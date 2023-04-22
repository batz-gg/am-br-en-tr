const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  
  test("valid text and locale fields", function(done){
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "american-to-british"
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'text');
        assert.equal(res.body.text, "Mangoes are my favorite fruit.");
        assert.property(res.body, "translation");
        assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        done();
      });
  });

  test("valid text and invalid locale fields", function(done){
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "french-to-british"
      })
      .end(function(err, res){
        //assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'error');
        assert.equal(res.body.error, "Invalid value for locale field");
        done();
      });
  });

  test("missing text fields", function(done){
    chai
      .request(server)
      .post("/api/translate")
      .send({
        locale: "french-to-british"
      })
      .end(function(err, res){
        //assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'error');
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });

  test("missing locale fields", function(done){
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit."
      })
      .end(function(err, res){
        //assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'error');
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });

  test("empty text file", function(done){
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "",
        locale: "french-to-british"
      })
      .end(function(err, res){
        //assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'error');
        assert.equal(res.body.error, "No text to translate");
        done();
      });
  });

  test("no required translation", function(done){
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "No translation required",
        locale: "american-to-british"
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'text');
        assert.equal(res.body.text, "No translation required");
        assert.property(res.body, "translation");
        assert.equal(res.body.translation, 'Everything looks good to me!');
        done();
      });
  });
});
