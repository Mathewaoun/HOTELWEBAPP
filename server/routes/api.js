const express = require('express');
const router = express.Router();
const Archive = require('../models/Archive');
const Address = require('../models/Address');
const Booking = require('../models/Booking');
const Chain = require('../models/Chain');   
const Customer = require('../models/Customer');
const Employee = require('../models/Employee');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

//import all the functions from the '../utils/db.js' file
const { getArchive, 
    getAddresses, 
    getBookings, 
    getChains, 
    getCustomers, 
    getEmployees, 
    getHotels, 
    getRooms,
    getHotelByID,
    getBookingByID,
    getChainByID,
    getRoomByID,
    getArchiveByID,
    getAddressByID,
    getCustomerByID,
    getEmployeeByID,
    getCustomerByEmail,
    getEmployeeByUsername,
    getHotelsByRating,
    getHotelsByChainID,
    getHotelsByCity,
    getRoomsByHotelID,
    getBookingsByCustomerID,
    getArchiveByCustomerID,
    getRoomWithinPriceRange,
    getRoomBySeaView,
    getRoomByMountainView,
    getRoomByExtendable,
    getBookingsByRoomID,
    getHotelRatingByID,
    getHotelNumRoomsByID,
    insertCustomer,
    insertEmployee,
    insertHotel,
    insertChain,
    insertRoom,
    insertAddress,
    insertBooking,
    insertArchive,
    deleteChain,
    deleteHotel,
    deleteRoom,
    deleteEmployee,
    deleteBooking,
    closeDatabase
} = require('../utils/db');


// Define your API endpoints here

// get all archive data from the database
router.get('/getArchive', (req, res) => {
    getArchive().then(archive => {
        res.json(archive);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all chains from the database
router.get('/getChains', (req, res) => {
    getChains().then(chains => {
        res.json(chains);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all customers from the database
router.get('/getCustomers', (req, res) => {
    getCustomers().then(customers => {
        res.json(customers);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all employees from the database
router.get('/getEmployees', (req, res) => {
    getEmployees().then(employees => {
        res.json(employees);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all hotels from the database
router.get('/getHotels', (req, res) => {
    getHotels().then(hotels => {
        res.json(hotels);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all rooms from the database
router.get('/getRooms', (req, res) => {
    getRooms().then(rooms => {
        res.json(rooms);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all bookings from the database
router.get('/getBookings', (req, res) => {
    getBookings().then(bookings => {
        res.json(bookings);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all addresses from the database
router.get('/getAddresses', (req, res) => {
    getAddresses().then(addresses => {
        res.json(addresses);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// create a new customer
router.post('/createCustomer', async (req, res) => {
    try {
        const {id, identification, firstName, lastName, email, password, cardholderName, cardNumber, cvv, cardExpiration, billingAddressId, addressId} = req.body;
        const newCustomer = new Customer(id, identification, firstName, lastName, email, password, cardholderName, cardNumber, cvv, cardExpiration, billingAddressId, addressId);
        await insertCustomer(newCustomer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/createArchive', (req, res) => {
    try {
        const {id, customerFirstName, customerLastName, roomNumber, checkInDate, checkOutDate, bookingDate} = req.body;
        const newArchive = new Archive(id, customerFirstName, customerLastName, roomNumber, checkInDate, checkOutDate, bookingDate);
        insertArchive(newArchive);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// create a new booking
router.post('/createBooking', (req, res) => {
    try {
        const {id, customerId, employeeId, roomId, archiveId, dateBooked, customerName, checkInDate, checkOutDate, numPeople, isRenting, paidOnline} = req.body;
        const newBooking = new Booking(id, customerId, employeeId, roomId, archiveId, dateBooked, customerName, checkInDate, checkOutDate, numPeople, isRenting, paidOnline);
        insertBooking(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// create a new archive
router.post('/createArchive', (req, res) => {
    try {
        const {id, customerFirstName, customerLastName, roomNumber, checkInDate, checkOutDate, bookingDate} = req.body;
        const newArchive = new Archive(id, customerFirstName, customerLastName, roomNumber, checkInDate, checkOutDate, bookingDate);
        insertArchive(newArchive);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// create a new address
router.post('/createAddress', async (req, res) => {
    try {
        const {id, street, apt, postalCode, province, city} = req.body;
        const newAddress = new Address(id, street, apt, postalCode, province, city);
        await insertAddress(newAddress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// create a new employee in the database
router.post('/createEmployee', (req, res) => {
    try {
        const {id, hotelId, firstName, lastName, username, password, addressId, role} = req.body;
        const newEmployee = new Employee(id, hotelId, firstName, lastName, username, password, addressId, role);
        insertEmployee(newEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get a customer by their id
router.get('/getCustomer/:id', (req, res) => {
    getCustomerByID(req.params.id).then(customer => {
        res.json(customer);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });

});

// get a customer by their email
router.get('/customerByEmail/:email', (req, res) => {    
    getCustomerByEmail(req.params.email).then(customer => {
        res.json(customer);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get an employee by their id
router.get('/employee/:id', (req, res) => {    
    getEmployeeByID(req.params.id).then(employee => {
        res.json(employee);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get chain by id
router.get('/chain/:id', (req, res) => {
    getChainByID(req.params.id).then(chain => {
        res.json(chain);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get hotel rating by id
router.get('/hotelRating/:id', (req, res) => {
    getHotelRatingByID(req.params.id).then(hotelRating => {
        res.json(hotelRating);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get hotel number of rooms by id
router.get('/hotelNumRooms/:id', (req, res) => {
    getHotelNumRoomsByID(req.params.id).then(hotelNumRooms => {
        res.json(hotelNumRooms);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get a room by their id
router.get('/room/:id', (req, res) => {
    getRoomByID(req.params.id).then(room => {
        res.json(room);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get an archive by their id
router.get('/archive/:id', (req, res) => {
    getArchiveByID(req.params.id).then(archive => {
        res.json(archive);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get an employee by their username
router.get('/employeeByUsername/:username', (req, res) => {
    getEmployeeByUsername(req.params.username).then(employee => {
        res.json(employee);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all hotels for a specific chain
router.get('/hotelsByChainID/:chainID', (req, res) => {
    getHotelsByChainID(req.params.chainID).then(hotels => {
        res.json(hotels);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all hotels with a specific rating or higher
router.get('/hotelsByRating/:rating', (req, res) => {
    getHotelsByRating(req.params.rating).then(hotels => {
        res.json(hotels);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get a hotel by their id
router.get('/hotel/:id', (req, res) => {
    getHotelByID(req.params.id).then(hotel => {
        res.json(hotel);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get a booking by their id
router.get('/booking/:id', (req, res) => {
    getBookingByID(req.params.id).then(booking => {
        res.json(booking);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get a hotel by city
router.get('/hotelsByCity/:city', (req, res) => {
    getHotelsByCity(req.params.city).then(hotels => {
        res.json(hotels);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all the rooms of a hotel by the hotel id
router.get('/roomsByHotelID/:hotelID', (req, res) => {
    getRoomsByHotelID(req.params.hotelID).then(rooms => {
        res.json(rooms);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get a rooms bookings by the room id
router.get('/bookingsByRoomID/:roomID', (req, res) => {
    getBookingsByRoomID(req.params.roomID).then(bookings => {
        res.json(bookings);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all the rooms within a price range
router.get('/roomsWithinPriceRange/:minPrice/:maxPrice', (req, res) => {
    getRoomWithinPriceRange(req.params.minPrice, req.params.maxPrice).then(rooms => {
        res.json(rooms);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all the rooms with a sea view
router.get('/roomsBySeaView', (req, res) => {
    getRoomBySeaView().then(rooms => {
        res.json(rooms);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all the rooms with a mountain view
router.get('/roomsByMountainView', (req, res) => {
    getRoomByMountainView().then(rooms => {
        res.json(rooms);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get all the rooms that are extendable
router.get('/roomsByExtendable', (req, res) => {
    getRoomByExtendable().then(rooms => {
        res.json(rooms);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get a customer bookings by the customer id
router.get('/bookingsByCustomerID/:customerID', (req, res) => {
    getBookingsByCustomerID(req.params.customerID).then(bookings => {
        res.json(bookings);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get a customer archive by the customer id
router.get('/archiveByCustomerID/:customerID', (req, res) => {
    getArchiveByCustomerID(req.params.customerID).then(archive => {
        res.json(archive);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// get an address by the address id
// get an address by the address id
router.get('/address/:id', (req, res) => {
    getAddressByID(req.params.id).then(address => {
        res.json(address);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// delete a chain by their id
router.delete('/deleteChain/:id', (req, res) => {
    deleteChain(req.params.id).then(() => {
        res.json({ message: 'Chain deleted' });
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// delete a hotel by their id
router.delete('/deleteHotel/:id', (req, res) => {
    deleteHotel(req.params.id).then(() => {
        res.json({ message: 'Hotel deleted' });
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// delete a room by their id
router.delete('/deleteRoom/:id', (req, res) => {
    deleteRoom(req.params.id).then(() => {
        res.json({ message: 'Room deleted' });
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// delete an employee by their id
router.delete('/deleteEmployee/:id', (req, res) => {
    deleteEmployee(req.params.id).then(() => {
        res.json({ message: 'Employee deleted' });
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

router.delete('/deleteBooking/:id', (req, res) => {
    deleteBooking(req.params.id).then(() => {
        res.json({ message: 'Chain deleted' });
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});


module.exports = router;
