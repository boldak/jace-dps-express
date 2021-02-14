class GHImplError extends Error {
    constructor(message) {
        super(message);
        this.name = "github service error";
    }
}

module.exports = GHImplError