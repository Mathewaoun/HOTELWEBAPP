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

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getCustomerFirstName() {
        return this.customerFirstName;
    }

    setCustomerFirstName(customerFirstName) {
        this.customerFirstName = customerFirstName;
    }

    getCustomerLastName() {
        return this.customerLastName;
    }

    setCustomerLastName(customerLastName) {
        this.customerLastName = customerLastName;
    }

    getRoomNumber() {
        return this.roomNumber;
    }

    setRoomNumber(roomNumber) {
        this.roomNumber = roomNumber;
    }

    getCheckInDate() {
        return this.checkInDate;
    }

    setCheckInDate(checkInDate) {
        this.checkInDate = checkInDate;
    }

    getCheckOutDate() {
        return this.checkOutDate;
    }

    setCheckOutDate(checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    getBookingDate() {
        return this.bookingDate;
    }

    setBookingDate(bookingDate) {
        this.bookingDate = bookingDate;
    }
}

module.exports = Archive;