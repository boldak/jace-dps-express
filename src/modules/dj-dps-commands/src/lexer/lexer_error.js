class LexerImplError extends Error {
    constructor(message) {
        super(message);
        this.name = "Lexer error.";
    }
}

module.exports = LexerImplError