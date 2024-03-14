class Room {
    constructor(id, hotelId, price, amenities, capacity, mountainView, seaView, extendable, issues) {
      this.id = id;
      this.hotelId = hotelId;
      this.price = price;
      this.amenities = amenities;
      this.capacity = capacity;
      this.mountainView = mountainView;
      this.seaView = seaView;
      this.extendable = extendable;
      this.issues = issues;
    }
  
    getId() {
      return this.id;
    }
  
    setId(id) {
      this.id = id;
    }
  
    getHotelId() {
      return this.hotelId;
    }
  
    setHotelId(hotelId) {
      this.hotelId = hotelId;
    }
  
    getPrice() {
      return this.price;
    }
  
    setPrice(price) {
      this.price = price;
    }
  
    getAmenities() {
      return this.amenities;
    }
  
    setAmenities(amenities) {
      this.amenities = amenities;
    }
  
    getCapacity() {
      return this.capacity;
    }
  
    setCapacity(capacity) {
      this.capacity = capacity;
    }
  
    getMountainView() {
      return this.mountainView;
    }
  
    setMountainView(mountainView) {
      this.mountainView = mountainView;
    }
  
    getSeaView() {
      return this.seaView;
    }
  
    setSeaView(seaView) {
      this.seaView = seaView;
    }
  
    getExtendable() {
      return this.extendable;
    }
  
    setExtendable(extendable) {
      this.extendable = extendable;
    }
  
    getIssues() {
      return this.issues;
    }
  
    setIssues(issues) {
      this.issues = issues;
    }
  }
  
  module.exports = Room;