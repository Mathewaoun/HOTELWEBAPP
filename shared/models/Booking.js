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

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getCustomerId() {
        return this.customerId;
    }

    setCustomerId(customerId) {
        this.customerId = customerId;
    }

    getEmployeeId() {
        return this.employeeId;
    }

    setEmployeeId(employeeId) {
        this.employeeId = employeeId;
    }

    getRoomId() {
        return this.roomId;
    }

    setRoomId(roomId) {
        this.roomId = roomId;
    }

    getArchiveId() {
        return this.archiveId;
    }

    setArchiveId(archiveId) {
        this.archiveId = archiveId;
    }

    getDateBooked() {
        return this.dateBooked;
    }

    setDateBooked(dateBooked) {
        this.dateBooked = dateBooked;
    }

    getCustomerName() {
        return this.customerName;
    }

    setCustomerName(customerName) {
        this.customerName = customerName;
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

    getNumPeople() {
        return this.numPeople;
    }

    setNumPeople(numPeople) {
        this.numPeople = numPeople;
    }

    getIsRenting() {
        return this.isRenting;
    }

    setIsRenting(isRenting) {
        this.isRenting = isRenting;
    }

    getPaidOnline() {
        return this.paidOnline;
    }

    setPaidOnline(paidOnline) {
        this.paidOnline = paidOnline;
    }
}

module.exports = Booking;