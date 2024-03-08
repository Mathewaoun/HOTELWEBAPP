class Chain {
    constructor(id, name, addressId, numLocations, email, phoneNumbers) {
        this.id = id;
        this.name = name;
        this.addressId = addressId;
        this.numLocations = numLocations;
        this.email = email;
        this.phoneNumbers = phoneNumbers;
    }

    // Getters
    get id() {
      return this._id;
    }

    get name() {
      return this._name;
    }

    get addressId() {
      return this._addressId;
    }

    get numLocations() {
      return this._numLocations;
    }

    get email() {
      return this._email;
    }

    get phoneNumbers() {
      return this._phoneNumbers;
    }

    // Setters
    set id(value) {
      this._id = value;
    }

    set name(value) {
      this._name = value;
    }

    set addressId(value) {
      this._addressId = value;
    }

    set numLocations(value) {
      this._numLocations = value;
    }

    set email(value) {
      this._email = value;
    }

    set phoneNumbers(value) {
      this._phoneNumbers = value;
    }
}