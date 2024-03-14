class Employee {
    constructor(id, hotelId, firstName, lastName, username, password, addressId, role) {
        this.id = id;
        this.hotelId = hotelId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = username;
        this.password = password;
        this.addressId = addressId;
        this.role = role;
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

    getFirstName() {
        return this.firstName;
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    getUserName() {
        return this.userName;
    }

    setUserName(userName) {
        this.userName = userName;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    getAddressId() {
        return this.addressId;
    }

    setAddressId(addressId) {
        this.addressId = addressId;
    }

    getRole() {
        return this.role;
    }

    setRole(role) {
        this.role = role;
    }
}

module.exports = Employee;