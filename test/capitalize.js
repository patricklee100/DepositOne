var capitalize = require("../capitalize");

var chai = require("chai");
var expect = chai.expect;

describe("capitalize", function() {
   it("capitalizes single workds", function() {
    expect(capitalize("express")).to.equal("Express");
   });
});