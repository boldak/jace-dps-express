
class ServiceDataverseError extends Error {
  constructor(message) {
    super(message);
    this.name = "service.dataverse error";
  }
}

ServiceDataverseError.prototype = Object.create(Error.prototype);
ServiceDataverseError.prototype.constructor = ServiceDataverseError;


module.exports = ServiceDataverseError