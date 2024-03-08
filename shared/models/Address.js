class Address {
    constructor(id, street, apt, postalCode, city, state) {
        this.id = id;
        this.street = street;
        this.apt = apt;
        this.postalCode = postalCode;
        this.city = city;
        this.state = state;
    }

    // Getter and Setter for 'id'
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    // Getter and Setter for 'street'
    get street() {
        return this._street;
    }

    set street(value) {
        this._street = value;
    }

    // Getter and Setter for 'apt'
    get apt() {
        return this._apt;
    }

    set apt(value) {
        this._apt = value;
    }

    // Getter and Setter for 'postalCode'
    get postalCode() {
        return this._postalCode;
    }

    set postalCode(value) {
        this._postalCode = value;
    }

    // Getter and Setter for 'city'
    get city() {
        return this._city;
    }

    set city(value) {
        this._city = value;
    }

    // Getter and Setter for 'state'
    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }
}