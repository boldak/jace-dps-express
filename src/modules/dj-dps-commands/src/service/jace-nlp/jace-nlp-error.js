
var JaceNlpError = function(message) {
    this.message = message;
    this.name = "Command 'service.nlp.*' implementation error";
}
JaceNlpError.prototype = Object.create(Error.prototype);
JaceNlpError.prototype.constructor = JaceNlpError;

module.exports = JaceNlpError
