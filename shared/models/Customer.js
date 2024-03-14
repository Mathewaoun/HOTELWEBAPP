class Customer {
    constructor(id, identification, firstName, lastName, email, password, registrationDate, cardholderName, cardNumber, cvv, cardExpiration, billingAddressId, addressId) {
        this.id = id;
        this.identification = identification;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.registrationDate = registrationDate;
        this.cardholderName = cardholderName;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.cardExpiration = cardExpiration;
        this.billingAddressId = billingAddressId;
        this.addressId = addressId;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getIdentification() {
        return this.identification;
    }

    setIdentification(identification) {
        this.identification = identification;
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

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    getRegistrationDate() {
        return this.registrationDate;
    }

    setRegistrationDate(registrationDate) {
        this.registrationDate = registrationDate;
    }

    getCardholderName() {
        return this.cardholderName;
    }

    setCardholderName(cardholderName) {
        this.cardholderName = cardholderName;
    }

    getCardNumber() {
        return this.cardNumber;
    }

    setCardNumber(cardNumber) {
        this.cardNumber = cardNumber;
    }

    getCvv() {
        return this.cvv;
    }

    setCvv(cvv) {
        this.cvv = cvv;
    }

    getCardExpiration() {
        return this.cardExpiration;
    }

    setCardExpiration(cardExpiration) {
        this.cardExpiration = cardExpiration;
    }

    getBillingAddressId() {
        return this.billingAddressId;
    }

    setBillingAddressId(billingAddressId) {
        this.billingAddressId = billingAddressId;
    }

    getAddressId() {
        return this.addressId;
    }

    setAddressId(addressId) {
        this.addressId = addressId;
    }
}

module.exports = Customer;
