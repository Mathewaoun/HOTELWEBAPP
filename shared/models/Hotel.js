class Hotel {
    constructor(id, chainId, archiveId, rating, numRooms, addressId, email, phoneNumbers) {
        this.id = id;
        this.chainId = chainId;
        this.archiveId = archiveId;
        this.rating = rating;
        this.numRooms = numRooms;
        this.addressId = addressId;
        this.email = email;
        this.phoneNumbers = phoneNumbers;
    }

    // Getters
    get id() {
      return this._id;
    }

    get chainId() {
      return this._chainId;
    }

    get archiveId() {
      return this._archiveId;
    }

    get rating() {
      return this._rating;
    }

    get numRooms() {
      return this._numRooms;
    }

    get addressId() {
      return this._addressId;
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

    set chainId(value) {
      this._chainId = value;
    }

    set archiveId(value) {
      this._archiveId = value;
    }

    set rating(value) {
      this._rating = value;
    }

    set numRooms(value) {
      this._numRooms = value;
    }

    set addressId(value) {
      this._addressId = value;
    }

    set email(value) {
      this._email = value;
    }

    set phoneNumbers(value) {
      this._phoneNumbers = value;
    }
}