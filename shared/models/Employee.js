
class Employee {
    constructor(id, hotelId, firstName, lastName, addressId, role) {
        this.id = id;
        this.hotelId = hotelId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.addressId = addressId;
        this.role = role;
    }

    get id() {
        return this.id;
    }

    set id(value) {
        this.id = value;
    }

    get hotelId() {
        return this.hotelId;
    }

    set hotelId(hotelId) {
        this.hotelId = hotelId;
    }

    get firstName() {
        return this.firstName;
    }

    set firstName(firstName) {
        this.firstName = firstName;
    }

    get lastName() {
        return this.lastName;
    }

    set lastName(lastName) {
        this.lastName = lastName;
    }

    get addressId() {
        return this.addressId;
    }

    set addressId(addressId) {
        this.addressId = addressId;
    }

    get role() {
        return this.role;
    }

    set role(role) {
        this.role = role;
    }
  }