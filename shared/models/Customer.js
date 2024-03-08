class Customer {
    constructor(id, identification, firstName, lastName, email, registrationDate, cardholderName, cardNumber, cvv, cardExpiration, billingAddressId, addressId) {
        this.id = id;
        this.identification = identification;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.registrationDate = registrationDate;
        this.cardholderName = cardholderName;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.cardExpiration = cardExpiration;
        this.billingAddressId = billingAddressId;
        this.addressId = addressId;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get identification() {
        return this._identification;
    }

    set identification(value) {
        this._identification = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get registrationDate() {
        return this._registrationDate;
    }

    set registrationDate(value) {
        this._registrationDate = value;
    }

    get cardholderName() {
        return this._cardholderName;
    }

    set cardholderName(value) {
        this._cardholderName = value;
    }

    get cardNumber() {
        return this._cardNumber;
    }

    set cardNumber(value) {
        this._cardNumber = value;
    }

    get cvv() {
        return this._cvv;
    }

    set cvv(value) {
        this._cvv = value;
    }

    get cardExpiration() {
        return this._cardExpiration;
    }

    set cardExpiration(value) {
        this._cardExpiration = value;
    }

    get billingAddressId() {
        return this._billingAddressId;
    }

    set billingAddressId(value) {
        this._billingAddressId = value;
    }

    get addressId() {
        return this._addressId;
    }

    set addressId(value) {
        this._addressId = value;
    }
}