class Booking {
    constructor(id, customerId, employeeId, roomId, archiveId, dateBooked, customerName, checkInDate, checkOutDate, numPeople, isRenting, paidOnline) {
        this.id = id;
        this.customerId = customerId;
        this.employeeId = employeeId;
        this.roomId = roomId;
        this.archiveId = archiveId;
        this.dateBooked = dateBooked;
        this.customerName = customerName;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.numPeople = numPeople;
        this.isRenting = isRenting;
        this.paidOnline = paidOnline;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get employeeId() {
        return this._employeeId;
    }

    set employeeId(value) {
        this._employeeId = value;
    }

    get roomId() {
        return this._roomId;
    }

    set roomId(value) {
        this._roomId = value;
    }

    get archiveId() {
        return this._archiveId;
    }

    set archiveId(value) {
        this._archiveId = value;
    }

    get dateBooked() {
        return this._dateBooked;
    }

    set dateBooked(value) {
        this._dateBooked = value;
    }

    get customerName() {
        return this._customerName;
    }

    set customerName(value) {
        this._customerName = value;
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

    get numPeople() {
        return this._numPeople;
    }

    set numPeople(value) {
        this._numPeople = value;
    }

    get isRenting() {
        return this._isRenting;
    }

    set isRenting(value) {
        this._isRenting = value;
    }

    get paidOnline() {
        return this._paidOnline;
    }

    set paidOnline(value) {
        this._paidOnline = value;
    }
}