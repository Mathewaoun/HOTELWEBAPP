class Hotel {
  constructor(id, chainID, rating, numRooms, addressID, email, phone) {
    this.id = id;
    this.chainID = chainID;
    this.rating = rating;
    this.numRooms = numRooms;
    this.addressID = addressID;
    this.email = email;
    this.phone = phone;
  }

  getId() {
    return this.id;
  }
  
  setId(id) {
    this.id = id;
  }
  
  getChainID() {
    return this.chainID;
  }
  
  setChainID(chainID) {
    this.chainID = chainID;
  }
  
  getRating() {
    return this.rating;
  }
  
  setRating(rating) {
    this.rating = rating;
  }
  
  getNumRooms() {
    return this.numRooms;
  }
  
  setNumRooms(numRooms) {
    this.numRooms = numRooms;
  }
  
  getAddressID() {
    return this.addressID;
  }
  
  setAddressID(addressID) {
    this.addressID = addressID;
  }
  
  getEmail() {
    return this.email;
  }
  
  setEmail(email) {
    this.email = email;
  }
  
  getPhone() {
    return this.phone;
  }
  
  setPhone(phone) {
    this.phone = phone;
  }
}

module.exports = Hotel;