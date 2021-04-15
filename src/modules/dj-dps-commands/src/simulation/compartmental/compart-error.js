module.exports = class SimCompartError extends Error {
  constructor(message) {
    super(message);
    this.name = "compartment simulation error";
  }
}