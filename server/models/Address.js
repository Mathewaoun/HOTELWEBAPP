class Address {
    constructor(id, street, apt, postalCode, province, city) {
        this.id = id;
        this.street = street;
        this.apt = apt;
        this.postalCode = postalCode;
        this.city = city;
        this.province = province;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getStreet() {
        return this.street;
    }

    setStreet(street) {
        this.street = street;
    }

    getApt() {
        return this.apt;
    }

    setApt(apt) {
        this.apt = apt;
    }

    getPostalCode() {
        return this.postalCode;
    }

    setPostalCode(postalCode) {
        this.postalCode = postalCode;
    }

    getCity() {
        return this.city;
    }

    setCity(city) {
        this.city = city;
    }

    getProvince() {
        return this.province;
    }

    setProvince(province) {
        this.province = province;
    }
}

module.exports = Address;