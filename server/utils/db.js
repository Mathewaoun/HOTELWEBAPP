const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const Archive = require('../models/Archive');
const Address = require('../models/Address');
const Booking = require('../models/Booking');
const Chain = require('../models/Chain');   
const Customer = require('../models/Customer');
const Employee = require('../models/Employee');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const { get } = require('http');

// Connect to SQLite database file
function connectToDatabase() {
  const db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) {
      console.error('Error connecting to SQLite database:', err);
    }});

  return db;
}

async function getArchive() {
    
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM ARCHIVE_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Archive(
          row.COLUMN_ARCHIVE_ID,
          row.COLUMN_CUSTOMER_FIRST_NAME,
          row.COLUMN_CUSTOMER_LAST_NAME,
          row.COLUMN_ROOM_NUMBER,
          row.COLUMN_CHECK_IN_DATE,
          row.COLUMN_CHECK_OUT_DATE,
          row.COLUMN_BOOKING_DATE
        )));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getCustomers() {

  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM CUSTOMER_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Customer(
          row.COLUMN_CUSTOMER_ID,
          row.COLUMN_CUSTOMER_IDENTIFICATION,
          row.COLUMN_CUSTOMER_FIRST_NAME,
          row.COLUMN_CUSTOMER_LAST_NAME,
          row.COLUMN_CUSTOMER_EMAIL,
          row.COLUMN_CUSTOMER_PASSWORD,
          row.COLUMN_CUSTOMER_CARDHOLDER_NAME,
          row.COLUMN_CUSTOMER_CARD_NUMBER,
          row.COLUMN_CUSTOMER_CVV,
          row.COLUMN_CUSTOMER_CARD_EXPIRATION,
          row.COLUMN_CUSTOMER_BILLING_ADDRESS_ID,
          row.COLUMN_CUSTOMER_ADDRESS_ID
        )));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getRooms() {
    
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM ROOM_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Room(
          row.COLUMN_ROOM_ID,
          row.COLUMN_ROOM_HOTEL_ID,
          row.COLUMN_ROOM_PRICE,
          row.COLUMN_ROOM_AMENITIES,
          row.COLUMN_ROOM_CAPACITY,
          row.COLUMN_ROOM_MOUNTAIN_VIEW,
          row.COLUMN_ROOM_SEA_VIEW,
          row.COLUMN_ROOM_EXTENDABLE,
          row.COLUMN_ROOM_ISSUES
        )));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getBookings() {
    
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM BOOKING_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Booking(
          row.COLUMN_BOOKING_ID,
          row.COLUMN_BOOKING_CUSTOMER_ID,
          row.COLUMN_BOOKING_EMPLOYEE_ID,
          row.COLUMN_BOOKING_ROOM_ID,
          row.COLUMN_BOOKING_ARCHIVE_ID,
          row.COLUMN_BOOKING_DATE_BOOKED,
          row.COLUMN_BOOKING_CUSTOMER_NAME,
          row.COLUMN_BOOKING_CHECK_IN_DATE,
          row.COLUMN_BOOKING_CHECK_OUT_DATE,
          row.COLUMN_BOOKING_NUM_PEOPLE,
          row.COLUMN_BOOKING_IS_RENTING,
          row.COLUMN_BOOKING_PAID_ONLINE
        )));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getEmployees() {

  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM EMPLOYEE_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Employee(
          row.COLUMN_EMPLOYEE_ID,
          row.COLUMN_EMPLOYEE_HOTEL_ID,
          row.COLUMN_EMPLOYEE_FIRST_NAME,
          row.COLUMN_EMPLOYEE_LAST_NAME,
          row.COLUMN_EMPLOYEE_USERNAME,
          row.COLUMN_EMPLOYEE_PASSWORD,
          row.COLUMN_EMPLOYEE_ADDRESS_ID,
          row.COLUMN_EMPLOYEE_ROLE
        )));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getHotels() {
    const db = connectToDatabase();
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM HOTEL_TABLE', (err, rows) => {
        if (err) {
          reject(err); // Reject the Promise if there's an error
        } else {
          // Resolve the Promise with the array of rows
          resolve(rows.map(row => new Hotel(
            row.COLUMN_HOTEL_ID,
            row.COLUMN_HOTEL_CHAIN_ID,
            row.COLUMN_HOTEL_RATING,
            row.COLUMN_HOTEL_NUM_ROOMS,
            row.COLUMN_HOTEL_ADDRESS_ID,
            row.COLUMN_HOTEL_EMAIL,
            row.COLUMN_HOTEL_PHONE_NUMBERS
          )));
          closeDatabase(db);
          return rows;
        }
      });
    });
}

async function getChains() {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM CHAIN_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Chain(
          row.COLUMN_CHAIN_ID,
          row.COLUMN_CHAIN_NAME,
          row.COLUMN_CHAIN_ADDRESS_ID,
          row.COLUMN_CHAIN_NUM_LOCATIONS,
          row.COLUMN_CHAIN_EMAIL,
          row.COLUMN_CHAIN_PHONE_NUMBERS
        )));
        closeDatabase(db);
        return rows;
      }
    });
  });
  
}

async function getAddresses() {
    const db = connectToDatabase();
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM ADDRESS_TABLE', (err, rows) => {
        if (err) {
          reject(err); // Reject the Promise if there's an error
        } else {
          // Resolve the Promise with the array of rows
          resolve(rows.map(row => new Address(
            row.COLUMN_ADDRESS_ID,
            row.COLUMN_ADDRESS_STREET,
            row.COLUMN_ADDRESS_APT,
            row.COLUMN_ADDRESS_POSTAL,
            row.COLUMN_ADDRESS_PROVINCE,
            row.COLUMN_ADDRESS_CITY
          )));
          closeDatabase(db);
          return rows;
        }
      });
    });
}

async function getCustomerByID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM CUSTOMER_TABLE WHERE COLUMN_CUSTOMER_ID = ?', [id], (err, row) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the row
        resolve(new Customer(
          row.COLUMN_CUSTOMER_ID,
          row.COLUMN_CUSTOMER_IDENTIFICATION,
          row.COLUMN_CUSTOMER_FIRST_NAME,
          row.COLUMN_CUSTOMER_LAST_NAME,
          row.COLUMN_CUSTOMER_EMAIL,
          row.COLUMN_CUSTOMER_PASSWORD,
          row.COLUMN_CUSTOMER_CARDHOLDER_NAME,
          row.COLUMN_CUSTOMER_CARD_NUMBER,
          row.COLUMN_CUSTOMER_CVV,
          row.COLUMN_CUSTOMER_CARD_EXPIRATION,
          row.COLUMN_CUSTOMER_BILLING_ADDRESS_ID,
          row.COLUMN_CUSTOMER_ADDRESS_ID
        ));
        closeDatabase(db);
        return row;
      }
    });
  });
}

async function getCustomerByEmail(email) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM CUSTOMER_TABLE WHERE COLUMN_CUSTOMER_EMAIL = ?', [email], (err, row) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the row
        resolve(new Customer(
          row.COLUMN_CUSTOMER_ID,
          row.COLUMN_CUSTOMER_IDENTIFICATION,
          row.COLUMN_CUSTOMER_FIRST_NAME,
          row.COLUMN_CUSTOMER_LAST_NAME,
          row.COLUMN_CUSTOMER_EMAIL,
          row.COLUMN_CUSTOMER_PASSWORD,
          row.COLUMN_CUSTOMER_CARDHOLDER_NAME,
          row.COLUMN_CUSTOMER_CARD_NUMBER,
          row.COLUMN_CUSTOMER_CVV,
          row.COLUMN_CUSTOMER_CARD_EXPIRATION,
          row.COLUMN_CUSTOMER_BILLING_ADDRESS_ID,
          row.COLUMN_CUSTOMER_ADDRESS_ID
        ));
        closeDatabase(db);
        return row;
      }
    });
  });
}

async function getEmployeeByID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM EMPLOYEE_TABLE WHERE COLUMN_EMPLOYEE_ID = ?', [id], (err, row) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the row
        resolve(new Employee(
          row.COLUMN_EMPLOYEE_ID,
          row.COLUMN_EMPLOYEE_HOTEL_ID,
          row.COLUMN_EMPLOYEE_FIRST_NAME,
          row.COLUMN_EMPLOYEE_LAST_NAME,
          row.COLUMN_EMPLOYEE_USERNAME,
          row.COLUMN_EMPLOYEE_PASSWORD,
          row.COLUMN_EMPLOYEE_ADDRESS_ID,
          row.COLUMN_EMPLOYEE_ROLE
        ));
        closeDatabase(db);
        return row;
      }
    });
  });
}

async function getEmployeeByUsername(username) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM EMPLOYEE_TABLE WHERE COLUMN_EMPLOYEE_USERNAME = ?', [username], (err, row) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the row
        resolve(new Employee(
          row.COLUMN_EMPLOYEE_ID,
          row.COLUMN_EMPLOYEE_HOTEL_ID,
          row.COLUMN_EMPLOYEE_FIRST_NAME,
          row.COLUMN_EMPLOYEE_LAST_NAME,
          row.COLUMN_EMPLOYEE_USERNAME,
          row.COLUMN_EMPLOYEE_PASSWORD,
          row.COLUMN_EMPLOYEE_ADDRESS_ID,
          row.COLUMN_EMPLOYEE_ROLE
        ));
        closeDatabase(db);
        return row;
      }
    });
  });
}

async function getChainByID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM CHAIN_TABLE WHERE COLUMN_CHAIN_ID = ?', [id], (err, row) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the row
        resolve(new Chain(
          row.COLUMN_CHAIN_ID,
          row.COLUMN_CHAIN_NAME,
          row.COLUMN_CHAIN_ADDRESS_ID,
          row.COLUMN_CHAIN_NUM_LOCATIONS,
          row.COLUMN_CHAIN_EMAIL,
          row.COLUMN_CHAIN_PHONE_NUMBERS
        ));
        closeDatabase(db);
        return row;
      }
    });
  });
}

async function getHotelByID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM HOTEL_TABLE WHERE COLUMN_HOTEL_ID = ?', [id], (err, row) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the row
        resolve(new Hotel(
          row.COLUMN_HOTEL_ID,
          row.COLUMN_HOTEL_CHAIN_ID,
          row.COLUMN_HOTEL_RATING,
          row.COLUMN_HOTEL_NUM_ROOMS,
          row.COLUMN_HOTEL_ADDRESS_ID,
          row.COLUMN_HOTEL_EMAIL,
          row.COLUMN_HOTEL_PHONE_NUMBERS
        ));
        closeDatabase(db);
        return row;
      }
    });
  });
}

async function getBookingByID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM BOOKING_TABLE WHERE COLUMN_BOOKING_ID = ?', [id], (err, row) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the row
        resolve(new Booking(
          row.COLUMN_BOOKING_ID,
          row.COLUMN_BOOKING_CUSTOMER_ID,
          row.COLUMN_BOOKING_EMPLOYEE_ID,
          row.COLUMN_BOOKING_ROOM_ID,
          row.COLUMN_BOOKING_ARCHIVE_ID,
          row.COLUMN_BOOKING_DATE_BOOKED,
          row.COLUMN_BOOKING_CUSTOMER_NAME,
          row.COLUMN_BOOKING_CHECK_IN_DATE,
          row.COLUMN_BOOKING_CHECK_OUT_DATE,
          row.COLUMN_BOOKING_NUM_PEOPLE,
          row.COLUMN_BOOKING_IS_RENTING,
          row.COLUMN_BOOKING_PAID_ONLINE
        ));
        closeDatabase(db);
        return row;
      }
    });
  });
}

async function getAddressByID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM ADDRESS_TABLE WHERE COLUMN_ADDRESS_ID = ?', [id], (err, row) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the row
        resolve(new Address(
          row.COLUMN_ADDRESS_ID,
          row.COLUMN_ADDRESS_STREET,
          row.COLUMN_ADDRESS_APT,
          row.COLUMN_ADDRESS_POSTAL,
          row.COLUMN_ADDRESS_PROVINCE,
          row.COLUMN_ADDRESS_CITY
        ));
        closeDatabase(db);
        return row;
      }
    });
  });
}

async function getHotelsByRating(rating) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM HOTEL_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Hotel(
          row.COLUMN_HOTEL_ID,
          row.COLUMN_HOTEL_CHAIN_ID,
          row.COLUMN_HOTEL_RATING,
          row.COLUMN_HOTEL_NUM_ROOMS,
          row.COLUMN_HOTEL_ADDRESS_ID,
          row.COLUMN_HOTEL_EMAIL,
          row.COLUMN_HOTEL_PHONE_NUMBERS
        )).filter(hotel => hotel.rating === rating));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getArchiveByID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM ARCHIVE_TABLE WHERE COLUMN_ARCHIVE_ID = ?', [id], (err, row) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the row
        resolve(new Archive(
          row.COLUMN_ARCHIVE_ID,
          row.COLUMN_CUSTOMER_FIRST_NAME,
          row.COLUMN_CUSTOMER_LAST_NAME,
          row.COLUMN_ROOM_NUMBER,
          row.COLUMN_CHECK_IN_DATE,
          row.COLUMN_CHECK_OUT_DATE,
          row.COLUMN_BOOKING_DATE
        ));
        closeDatabase(db);
        return row;
      }
    });
  });
}

async function getHotelsByChainID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM HOTEL_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Hotel(
          row.COLUMN_HOTEL_ID,
          row.COLUMN_HOTEL_CHAIN_ID,
          row.COLUMN_HOTEL_RATING,
          row.COLUMN_HOTEL_NUM_ROOMS,
          row.COLUMN_HOTEL_ADDRESS_ID,
          row.COLUMN_HOTEL_EMAIL,
          row.COLUMN_HOTEL_PHONE_NUMBERS
        )).filter(hotel => hotel.chainID === id));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getHotelsByCity(city) {
  
  const hotels = [];

  await getHotels().then((hotels) => {
    hotels.forEach((hotel) => {
      getAddressByID(hotel.addressID).then((address) => {
        if (address.city === city) {
          hotels.push(hotel);
        }
      });
    });
  });

  return hotels;
}

async function getRoomsByHotelID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM ROOM_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Room(
          row.COLUMN_ROOM_ID,
          row.COLUMN_ROOM_HOTEL_ID,
          row.COLUMN_ROOM_PRICE,
          row.COLUMN_ROOM_AMENITIES,
          row.COLUMN_ROOM_CAPACITY,
          row.COLUMN_ROOM_MOUNTAIN_VIEW,
          row.COLUMN_ROOM_SEA_VIEW,
          row.COLUMN_ROOM_EXTENDABLE,
          row.COLUMN_ROOM_ISSUES
        )).filter(room => room.hotelID === id));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getRoomByID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM ROOM_TABLE WHERE COLUMN_ROOM_ID = ?', [id], (err, row) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the row
        resolve(new Room(
          row.COLUMN_ROOM_ID,
          row.COLUMN_ROOM_HOTEL_ID,
          row.COLUMN_ROOM_PRICE,
          row.COLUMN_ROOM_AMENITIES,
          row.COLUMN_ROOM_CAPACITY,
          row.COLUMN_ROOM_MOUNTAIN_VIEW,
          row.COLUMN_ROOM_SEA_VIEW,
          row.COLUMN_ROOM_EXTENDABLE,
          row.COLUMN_ROOM_ISSUES
        ));
        closeDatabase(db);
        return row;
      }
    });
  });
}

async function getBookingsByCustomerID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM BOOKING_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Booking(
          row.COLUMN_BOOKING_ID,
          row.COLUMN_BOOKING_CUSTOMER_ID,
          row.COLUMN_BOOKING_EMPLOYEE_ID,
          row.COLUMN_BOOKING_ROOM_ID,
          row.COLUMN_BOOKING_ARCHIVE_ID,
          row.COLUMN_BOOKING_DATE_BOOKED,
          row.COLUMN_BOOKING_CUSTOMER_NAME,
          row.COLUMN_BOOKING_CHECK_IN_DATE,
          row.COLUMN_BOOKING_CHECK_OUT_DATE,
          row.COLUMN_BOOKING_NUM_PEOPLE,
          row.COLUMN_BOOKING_IS_RENTING,
          row.COLUMN_BOOKING_PAID_ONLINE
        )).filter(booking => booking.customerID === id));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getArchiveByCustomerID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM ARCHIVE_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Archive(
          row.COLUMN_ARCHIVE_ID,
          row.COLUMN_CUSTOMER_FIRST_NAME,
          row.COLUMN_CUSTOMER_LAST_NAME,
          row.COLUMN_ROOM_NUMBER,
          row.COLUMN_CHECK_IN_DATE,
          row.COLUMN_CHECK_OUT_DATE,
          row.COLUMN_BOOKING_DATE
        )).filter(archive => archive.customerID === id));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getRoomWithinPriceRange(min, max) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM ROOM_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Room(
          row.COLUMN_ROOM_ID,
          row.COLUMN_ROOM_HOTEL_ID,
          row.COLUMN_ROOM_PRICE,
          row.COLUMN_ROOM_AMENITIES,
          row.COLUMN_ROOM_CAPACITY,
          row.COLUMN_ROOM_MOUNTAIN_VIEW,
          row.COLUMN_ROOM_SEA_VIEW,
          row.COLUMN_ROOM_EXTENDABLE,
          row.COLUMN_ROOM_ISSUES
        )).filter(room => room.price >= min && room.price <= max));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getRoomByMountainView() {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM ROOM_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Room(
          row.COLUMN_ROOM_ID,
          row.COLUMN_ROOM_HOTEL_ID,
          row.COLUMN_ROOM_PRICE,
          row.COLUMN_ROOM_AMENITIES,
          row.COLUMN_ROOM_CAPACITY,
          row.COLUMN_ROOM_MOUNTAIN_VIEW,
          row.COLUMN_ROOM_SEA_VIEW,
          row.COLUMN_ROOM_EXTENDABLE,
          row.COLUMN_ROOM_ISSUES
        )).filter(room => room.mountainView === true));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getRoomBySeaView() {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM ROOM_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Room(
          row.COLUMN_ROOM_ID,
          row.COLUMN_ROOM_HOTEL_ID,
          row.COLUMN_ROOM_PRICE,
          row.COLUMN_ROOM_AMENITIES,
          row.COLUMN_ROOM_CAPACITY,
          row.COLUMN_ROOM_MOUNTAIN_VIEW,
          row.COLUMN_ROOM_SEA_VIEW,
          row.COLUMN_ROOM_EXTENDABLE,
          row.COLUMN_ROOM_ISSUES
        )).filter(room => room.seaView === true));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getRoomByExtendable() {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM ROOM_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Room(
          row.COLUMN_ROOM_ID,
          row.COLUMN_ROOM_HOTEL_ID,
          row.COLUMN_ROOM_PRICE,
          row.COLUMN_ROOM_AMENITIES,
          row.COLUMN_ROOM_CAPACITY,
          row.COLUMN_ROOM_MOUNTAIN_VIEW,
          row.COLUMN_ROOM_SEA_VIEW,
          row.COLUMN_ROOM_EXTENDABLE,
          row.COLUMN_ROOM_ISSUES
        )).filter(room => room.extendable === true));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getBookingsByRoomID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM BOOKING_TABLE', (err, rows) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        // Resolve the Promise with the array of rows
        resolve(rows.map(row => new Booking(
          row.COLUMN_BOOKING_ID,
          row.COLUMN_BOOKING_CUSTOMER_ID,
          row.COLUMN_BOOKING_EMPLOYEE_ID,
          row.COLUMN_BOOKING_ROOM_ID,
          row.COLUMN_BOOKING_ARCHIVE_ID,
          row.COLUMN_BOOKING_DATE_BOOKED,
          row.COLUMN_BOOKING_CUSTOMER_NAME,
          row.COLUMN_BOOKING_CHECK_IN_DATE,
          row.COLUMN_BOOKING_CHECK_OUT_DATE,
          row.COLUMN_BOOKING_NUM_PEOPLE,
          row.COLUMN_BOOKING_IS_RENTING,
          row.COLUMN_BOOKING_PAID_ONLINE
        )).filter(booking => booking.roomID === id));
        closeDatabase(db);
        return rows;
      }
    });
  });
}

async function getHotelRatingByID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM HOTEL_TABLE WHERE COLUMN_HOTEL_ID = ?', [id], (err, row) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        resolve(row.rating);
        closeDatabase(db);
        return row;
      }
    });
  });
}

async function getHotelNumRoomsByID(id) {
  const db = connectToDatabase();
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM HOTEL_TABLE WHERE COLUMN_HOTEL_ID = ?', [id], (err, row) => {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        resolve(row.numRooms);
        closeDatabase(db);
        return row;
      }
    });
  });
}

async function insertCustomer(c) {
  const db = connectToDatabase();
  const result = await db.run(`INSERT INTO ${CUSTOMER_TABLE} 
                  (${COLUMN_CUSTOMER_IDENTIFICATION}, 
                    ${COLUMN_CUSTOMER_FIRST_NAME}, 
                    ${COLUMN_CUSTOMER_LAST_NAME}, 
                    ${COLUMN_CUSTOMER_EMAIL}, 
                    ${COLUMN_CUSTOMER_PASSWORD},  
                    ${COLUMN_CUSTOMER_CARDHOLDER_NAME}, 
                    ${COLUMN_CUSTOMER_CARD_NUMBER}, 
                    ${COLUMN_CUSTOMER_CVV}, 
                    ${COLUMN_CUSTOMER_CARD_EXPIRATION}, 
                    ${COLUMN_CUSTOMER_BILLING_ADDRESS_ID}, 
                    ${COLUMN_CUSTOMER_ADDRESS_ID}) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [c.getIdentification(), c.getFirstName(), c.getLastName(), c.getEmail(), c.getPassword(), c.getCardholderName(), c.getCardNumber(), c.getCvv(), c.getCardExpiration(), c.getBillingAddressId(), c.getAddressId()], function(err) {
                      if (err) {
                          // Handle the error here
                          console.error('Error inserting customer:', err.message);
                      } else {
                          console.log('Customer inserted successfully');
                          // Handle success here if needed
                      }
                  });

  closeDatabase(db);

  return result;
}

async function insertBooking(b) {
  const db = connectToDatabase();
  const result = await db.run(`INSERT INTO ${BOOKING_TABLE} 
                  (${COLUMN_BOOKING_CUSTOMER_ID}, 
                    ${COLUMN_BOOKING_EMPLOYEE_ID}, 
                    ${COLUMN_BOOKING_ROOM_ID}, 
                    ${COLUMN_BOOKING_ARCHIVE_ID}, 
                    ${COLUMN_BOOKING_DATE_BOOKED}, 
                    ${COLUMN_BOOKING_CUSTOMER_NAME}, 
                    ${COLUMN_BOOKING_CHECK_IN_DATE}, 
                    ${COLUMN_BOOKING_CHECK_OUT_DATE}, 
                    ${COLUMN_BOOKING_NUM_PEOPLE}, 
                    ${COLUMN_BOOKING_IS_RENTING}, 
                    ${COLUMN_BOOKING_PAID_ONLINE}) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [b.getCustomerId(), b.getEmployeeId(), b.getRoomId(), b.getArchiveId(), b.getDateBooked(), b.getCustomerName(), b.getCheckInDate(), b.getCheckOutDate(), b.getNumPeople(), b.getIsRenting(), b.getPaidOnline()], function(err) {
                      if (err) {
                          // Handle the error here
                          console.error('Error inserting booking:', err.message);
                      } else {
                          console.log('Booking inserted successfully');
                          // Handle success here if needed
                      }
                  });
  closeDatabase(db);
}

function insertRoom(r) {
    db.run(`INSERT INTO ${ROOM_TABLE} 
                    (${COLUMN_ROOM_HOTEL_ID}, 
                      ${COLUMN_ROOM_PRICE}, 
                      ${COLUMN_ROOM_AMENITIES}, 
                      ${COLUMN_ROOM_CAPACITY}, 
                      ${COLUMN_ROOM_MOUNTAIN_VIEW}, 
                      ${COLUMN_ROOM_SEA_VIEW}, 
                      ${COLUMN_ROOM_EXTENDABLE}, 
                      ${COLUMN_ROOM_ISSUES}) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [r.getHotelId(), r.getPrice(), r.getAmenities(), r.getCapacity(), r.getMountainView(), r.getSeaView(), r.getExtendable(), r.getIssues()], function(err) {
                        if (err) {
                            // Handle the error here
                            console.error('Error inserting room:', err.message);
                        } else {
                            console.log('Room inserted successfully');
                            // Handle success here if needed
                        }
                    });
}

function insertEmployee(e) {
    db.run(`INSERT INTO ${EMPLOYEE_TABLE} 
                    (${COLUMN_EMPLOYEE_HOTEL_ID}, 
                      ${COLUMN_EMPLOYEE_FIRST_NAME}, 
                      ${COLUMN_EMPLOYEE_LAST_NAME}, 
                      ${COLUMN_EMPLOYEE_USERNAME}, 
                      ${COLUMN_EMPLOYEE_PASSWORD}, 
                      ${COLUMN_EMPLOYEE_ADDRESS_ID}, 
                      ${COLUMN_EMPLOYEE_ROLE}) 
                      VALUES (?, ?, ?, ?, ?, ?, ?)`, [e.getHotelId(), e.getFirstName(), e.getLastName(), e.getUserName(), e.getPassword(), e.getAddressId(), e.getRole()], function(err) {
                        if (err) {
                            // Handle the error here
                            console.error('Error inserting employee:', err.message);
                        } else {
                            console.log('Employee inserted successfully');
                            // Handle success here if needed
                        }
                    });
}

function insertHotel(h) {
    db.run(`INSERT INTO ${HOTEL_TABLE} 
                    (${COLUMN_HOTEL_CHAIN_ID}, 
                      ${COLUMN_HOTEL_RATING}, 
                      ${COLUMN_HOTEL_NUM_ROOMS}, 
                      ${COLUMN_HOTEL_ADDRESS_ID}, 
                      ${COLUMN_HOTEL_EMAIL}, 
                      ${COLUMN_HOTEL_PHONE_NUMBERS}) 
                      VALUES (?, ?, ?, ?, ?, ?)`, [h.getChainID(), h.getRating(), h.getNumRooms(), h.getAddressID(), h.getEmail(), h.getPhone()], function(err) {
                        if (err) {
                            // Handle the error here
                            console.error('Error inserting hotel:', err.message);
                        } else {
                            console.log('Hotel inserted successfully');
                            // Handle success here if needed
                        }
                    });
}

function insertChain(c) {
    db.run(`INSERT INTO ${CHAIN_TABLE} 
                    (${COLUMN_CHAIN_NAME}, 
                      ${COLUMN_CHAIN_ADDRESS_ID}, 
                      ${COLUMN_CHAIN_NUM_LOCATIONS}, 
                      ${COLUMN_CHAIN_EMAIL}, 
                      ${COLUMN_CHAIN_PHONE_NUMBERS}) 
                      VALUES (?, ?, ?, ?, ?)`, [c.getName(), c.getAddressId(), c.getNumLocations(), c.getEmail(), c.getPhoneNumbers()], function(err) {
                        if (err) {
                            // Handle the error here
                            console.error('Error inserting chain:', err.message);
                        } else {
                            console.log('Chain inserted successfully');
                            // Handle success here if needed
                        }
                    });
}

async function insertAddress(a) {
  const db = connectToDatabase();
  const result = await db.run(`INSERT INTO ${ADDRESS_TABLE} 
                  (${COLUMN_ADDRESS_STREET}, 
                    ${COLUMN_ADDRESS_APT}, 
                    ${COLUMN_ADDRESS_POSTAL}, 
                    ${COLUMN_ADDRESS_PROVINCE}, 
                    ${COLUMN_ADDRESS_CITY}) 
                    VALUES (?, ?, ?, ?, ?)`, [a.getStreet(), a.getApt(), a.getPostalCode(), a.getProvince(), a.getCity()], function(err) {
                      if (err) {
                          // Handle the error here
                          console.error('Error inserting address:', err.message);
                      } else {
                          console.log('Address inserted successfully');
                          // Handle success here if needed
                      }
                  });

  closeDatabase(db);

  return result;
}

async function insertArchive(archive) {
  const db = connectToDatabase();
  const result = await db.run(`INSERT INTO ${ARCHIVE_TABLE} 
                  (${COLUMN_ARCHIVE_CUSTOMER_FIRST_NAME}, 
                    ${COLUMN_ARCHIVE_CUSTOMER_LAST_NAME}, 
                    ${COLUMN_ARCHIVE_ROOM_NUMBER}, 
                    ${COLUMN_ARCHIVE_CHECK_IN_DATE}, 
                    ${COLUMN_ARCHIVE_CHECK_OUT_DATE}, 
                    ${COLUMN_ARCHIVE_BOOKING_DATE}) 
                    VALUES (?, ?, ?, ?, ?, ?)`, [archive.getCustomerFirstName(), archive.getCustomerLastName(), archive.getRoomNumber(), archive.getCheckInDate(), archive.getCheckOutDate(), archive.getBookingDate()], function(err) {
                      if (err) {
                          // Handle the error here
                          console.error('Error inserting Archive:', err.message);
                      } else {
                          console.log('Archive inserted successfully');
                          // Handle success here if needed
                      }
                  });
  closeDatabase(db);
}

async function deleteChain(id) {
  const db = connectToDatabase();
  const result = await db.run('DELETE FROM CHAIN_TABLE WHERE COLUMN_CHAIN_ID = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting chain:', err);
    } else {
      console.log('Chain deleted successfully');
    }
  });
  closeDatabase(db);
}

async function deleteHotel(id) {
  const db = connectToDatabase();
  const result = await db.run('DELETE FROM HOTEL_TABLE WHERE COLUMN_HOTEL_ID = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting hotel:', err);
    } else {
      console.log('Hotel deleted successfully');
    }
  });
  closeDatabase(db);
}

async function deleteRoom(id) {
  const db = connectToDatabase();
  const result = await db.run('DELETE FROM ROOM_TABLE WHERE COLUMN_ROOM_ID = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting room:', err);
    } else {
      console.log('Room deleted successfully');
    }
  });
  closeDatabase(db);
}

async function deleteEmployee(id) {
  const db = connectToDatabase();
  const result = await db.run('DELETE FROM EMPLOYEE_TABLE WHERE COLUMN_EMPLOYEE_ID = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting employee:', err);
    } else {
      console.log('Employee deleted successfully');
    }
  });
  closeDatabase(db);
}

function closeDatabase(db) {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      }});
}

module.exports = { 
    connectToDatabase,
    getArchive,
    getCustomers,
    getRooms,
    getBookings,
    getEmployees,
    getHotels,
    getChains,
    getAddresses,
    getCustomerByID,
    getCustomerByEmail,
    getEmployeeByID,
    getEmployeeByUsername,
    getChainByID,
    getHotelByID,
    getBookingByID,
    getAddressByID,
    getHotelsByRating,
    getArchiveByID,
    getHotelsByChainID,
    getHotelsByCity,
    getRoomsByHotelID,
    getRoomByID,
    getBookingsByCustomerID,
    getArchiveByCustomerID,
    getRoomWithinPriceRange,
    getRoomByMountainView,
    getRoomBySeaView,
    getRoomByExtendable,
    getBookingsByRoomID,
    getHotelRatingByID,
    getHotelNumRoomsByID,
    insertCustomer,
    insertBooking,
    insertRoom,
    insertEmployee,
    insertHotel,
    insertChain,
    insertAddress,
    insertArchive,
    deleteChain,
    deleteHotel,
    deleteRoom,
    deleteEmployee,
    closeDatabase
};
