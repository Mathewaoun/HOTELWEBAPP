class Archive {

    constructor(id, customerFirstName, customerLastName, roomNumber, checkInDate, checkOutDate, bookingDate) {
        this.id = id;
        this.customerFirstName = customerFirstName;
        this.customerLastName = customerLastName;
        this.roomNumber = roomNumber;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingDate = bookingDate;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get customerName() {
        return `${this.customerFirstName} ${this.customerLastName}`;
    }

    set customerFirstName(value) {
        this._customerName = value;
    }

    set customerLastName(value) {
        this._customerLastName = value;
    }

    get roomNumber() {
        return this._roomNumber;
    }

    set roomNumber(value) {
        this._roomNumber = value;
    }

    get checkInDate() {
        return this._checkInDate;
    }

    set checkInDate(value) {
        this._checkInDate = value;
    }

    get checkOutDate() {
        return this._checkOutDate;
    }

    set checkOutDate(value) {
        this._checkOutDate = value;
    }

    get bookingDate() {
        return this._bookingDate;
    }

    set bookingDate(value) {
        this._bookingDate = value;
    }
}