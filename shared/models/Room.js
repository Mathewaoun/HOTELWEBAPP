class Room {
    constructor(id, hotelId, price, amenities, capacity, mountainView, seaView, extendable, issues) {
        this.id = id;
        this.hotelId = hotelId;
        this.price = price;
        this.amenities = amenities;
        this.capacity = capacity;
        this.mountainView = mountainView;
        this.seaView = seaView;
        this.extendable = extendable;
        this.issues = issues;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get hotelId() {
        return this._hotelId;
    }

    set hotelId(value) {
        this._hotelId = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get amenities() {
        return this._amenities;
    }

    set amenities(value) {
        this._amenities = value;
    }

    get capacity() {
        return this._capacity;
    }

    set capacity(value) {
        this._capacity = value;
    }

    get mountainView() {
        return this._mountainView;
    }

    set mountainView(value) {
        this._mountainView = value;
    }

    get seaView() {
        return this._seaView;
    }

    set seaView(value) {
        this._seaView = value;
    }

    get extendable() {
        return this._extendable;
    }

    set extendable(value) {
        this._extendable = value;
    }

    get issues() {
        return this._issues;
    }

    set issues(value) {
        this._issues = value;
    }
}