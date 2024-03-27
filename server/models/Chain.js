class Chain {
    constructor(id, name, addressId, numLocations, email, phoneNumbers) {
        this.id = id;
        this.name = name;
        this.addressId = addressId;
        this.numLocations = numLocations;
        this.email = email;
        this.phoneNumbers = phoneNumbers;
    }
  
    getId() {
        return this.id;
    }
  
    setId(id) {
        this.id = id;
    }
  
    getName() {
        return this.name;
    }
  
    setName(name) {
        this.name = name;
    }
  
    getAddressId() {
        return this.addressId;
    }
  
    setAddressId(addressId) {
        this.addressId = addressId;
    }
  
    getNumLocations() {
        return this.numLocations;
    }
  
    setNumLocations(numLocations) {
        this.numLocations = numLocations;
    }
  
    getEmail() {
        return this.email;
    }
  
    setEmail(email) {
        this.email = email;
    }
  
    getPhoneNumbers() {
        return this.phoneNumbers;
    }
  
    setPhoneNumbers(phoneNumbers) {
        this.phoneNumbers = phoneNumbers;
    }

  }
  
  module.exports = Chain;