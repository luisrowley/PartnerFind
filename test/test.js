var request = require("request"),
    assert = require('assert'),
    spiderTest = require("../app.js"),
    base_url = "http://127.0.0.1:3000/";

describe("Hello World Server", function(){
    describe("GET /", function() {
        it("returns status code 200", function(done) {

            request.get(base_url, function(error, response, body) {

                assert.equal(200, response.statusCode);
                done();

            });
        });

        it("returns Spidergap test", function(done) {

            request.get(base_url, function(error, response, body) {
                assert.equal("Spidergap test", body);
                spiderTest.closeServer();
                done();
            });
        });
    });
});

