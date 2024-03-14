const express = require('express');
const db = require('../db');

const router = express.Router();

// Route to render the hotel list page
router.get('/backend', async (req, res) => {
  const archive = await getArchive();
  const addresses = await getAddresses();
  const chains = await getChains();
  const hotels = await getHotels();
  const employees = await getEmployees();
  const rooms = await getRooms();
  const customers = await getCustomers();
  const bookings = await getBookings();
  res.json({ archive, addresses, chains, hotels, employees, rooms, customers, bookings });

});

module.exports = router;

async function getArchive() {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM ARCHIVE_TABLE', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const archive = rows.map(row => {
      return new Archive(
        row.COLUMN_ARCHIVE_ID,
        row.COLUMN_CUSTOMER_FIRST_NAME,
        row.COLUMN_CUSTOMER_LAST_NAME,
        row.COLUMN_ROOM_NUMBER,
        row.COLUMN_CHECK_IN_DATE,
        row.COLUMN_CHECK_OUT_DATE,
        row.COLUMN_BOOKING_DATE
      );
    });

    return archive;
  } catch (error) {
    throw new Error(`Error fetching archive: ${error.message}`);
  }

}

async function getAddresses() {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM ADDRESS_TABLE', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const addresses = rows.map(row => {
      return new Address(
        row.COLUMN_ADDRESS_ID,
        row.COLUMN_ADDRESS_STREET,
        row.COLUMN_ADDRESS_APT,
        row.COLUMN_ADDRESS_POSTAL,
        row.COLUMN_ADDRESS_PROVINCE,
        row.COLUMN_ADDRESS_CITY
      );
    });

    return addresses;
  } catch (error) {
    throw new Error(`Error fetching addresses: ${error.message}`);
  }

}

async function getChains() {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM CHAIN_TABLE', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const chains = rows.map(row => {
      return new Chain(
        row.COLUMN_CHAIN_ID,
        row.COLUMN_CHAIN_NAME,
        row.COLUMN_CHAIN_ADDRESS_ID,
        row.COLUMN_CHAIN_NUM_LOCATIONS,
        row.COLUMN_CHAIN_EMAIL,
        row.COLUMN_CHAIN_PHONE_NUMBERS
      );
    });

    return chains;
  } catch (error) {
    throw new Error(`Error fetching chains: ${error.message}`);
  }
}

async function getHotels() {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM HOTEL_TABLE', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const hotels = rows.map(row => {
      return new Hotel(
        row.COLUMN_HOTEL_ID,
        row.COLUMN_HOTEL_CHAIN_ID,
        row.COLUMN_HOTEL_RATING,
        row.COLUMN_HOTEL_NUM_ROOMS,
        row.COLUMN_HOTEL_ADDRESS_ID,
        row.COLUMN_HOTEL_EMAIL,
        row.COLUMN_HOTEL_PHONE_NUMBERS
      );
    });

    return hotels;
  } catch (error) {
    throw new Error(`Error fetching hotels: ${error.message}`);
  }
}

async function getEmployees() {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM EMPLOYEE_TABLE', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const employees = rows.map(row => {
      return new Employee(
        row.COLUMN_EMPLOYEE_ID,
        row.COLUMN_EMPLOYEE_HOTEL_ID,
        row.COLUMN_EMPLOYEE_FIRST_NAME,
        row.COLUMN_EMPLOYEE_LAST_NAME,
        row.COLUMN_EMPLOYEE_USERNAME,
        row.COLUMN_EMPLOYEE_PASSWORD,
        row.COLUMN_EMPLOYEE_ADDRESS_ID,
        row.COLUMN_EMPLOYEE_ROLE
      );
    });

    return employees;
  } catch (error) {
    throw new Error(`Error fetching employees: ${error.message}`);
  }

}

async function getRooms() {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM ROOM_TABLE', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const rooms = rows.map(row => {
      return new Room(
        row.COLUMN_ROOM_ID,
        row.COLUMN_ROOM_HOTEL_ID,
        row.COLUMN_ROOM_PRICE,
        row.COLUMN_ROOM_AMENITIES,
        row.COLUMN_ROOM_CAPACITY,
        row.COLUMN_ROOM_MOUNTAIN_VIEW,
        row.COLUMN_ROOM_SEA_VIEW,
        row.COLUMN_ROOM_EXTENDABLE,
        row.COLUMN_ROOM_ISSUES
      );
    });

    return rooms;
  } catch (error) {
    throw new Error(`Error fetching rooms: ${error.message}`);
  }
}

async function getCustomers() {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM CUSTOMER_TABLE', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const customers = rows.map(row => {
      return new Customer(
        row.COLUMN_CUSTOMER_ID,
        row.COLUMN_CUSTOMER_IDENTIFICATION,
        row.COLUMN_CUSTOMER_FIRST_NAME,
        row.COLUMN_CUSTOMER_LAST_NAME,
        row.COLUMN_CUSTOMER_EMAIL,
        row.COLUMN_CUSTOMER_PASSWORD,
        row.COLUMN_CUSTOMER_REGISTRATION_DATE,
        row.COLUMN_CUSTOMER_CARDHOLDER_NAME,
        row.COLUMN_CUSTOMER_CARD_NUMBER,
        row.COLUMN_CUSTOMER_CVV,
        row.COLUMN_CUSTOMER_CARD_EXPIRATION,
        row.COLUMN_CUSTOMER_BILLING_ADDRESS_ID,
        row.COLUMN_CUSTOMER_ADDRESS_ID
      );
    });

    return customers;
  } catch (error) {
    throw new Error(`Error fetching customers: ${error.message}`);
  }

}

async function getBookings() {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM BOOKING_TABLE', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const bookings = rows.map(row => {
      return new Booking(
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
      );
    });

    return bookings;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}

async function getCustomerByEmail(email) {
  try {
    const row = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM CUSTOMER_TABLE WHERE COLUMN_CUSTOMER_EMAIL = ?', [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (!row) {
      return null; // Customer not found
    }

    // Create Customer object from the row data
    const customer = new Customer(
      row.COLUMN_CUSTOMER_ID,
      row.COLUMN_CUSTOMER_IDENTIFICATION,
      row.COLUMN_CUSTOMER_FIRST_NAME,
      row.COLUMN_CUSTOMER_LAST_NAME,
      row.COLUMN_CUSTOMER_EMAIL,
      row.COLUMN_CUSTOMER_PASSWORD,
      row.COLUMN_CUSTOMER_REGISTRATION_DATE,
      row.COLUMN_CUSTOMER_CARDHOLDER_NAME,
      row.COLUMN_CUSTOMER_CARD_NUMBER,
      row.COLUMN_CUSTOMER_CVV,
      row.COLUMN_CUSTOMER_CARD_EXPIRATION,
      row.COLUMN_CUSTOMER_BILLING_ADDRESS_ID,
      row.COLUMN_CUSTOMER_ADDRESS_ID
    );

    return customer;
  } catch (error) {
    throw new Error(`Error fetching customer by email: ${error.message}`);
  }
}

async function getCustomerById(id) {
  try {
    const row = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM CUSTOMER_TABLE WHERE COLUMN_CUSTOMER_ID = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (!row) {
      return null; // Customer not found
    }

    // Create Customer object from the row data
    const customer = new Customer(
      row.COLUMN_CUSTOMER_ID,
      row.COLUMN_CUSTOMER_IDENTIFICATION,
      row.COLUMN_CUSTOMER_FIRST_NAME,
      row.COLUMN_CUSTOMER_LAST_NAME,
      row.COLUMN_CUSTOMER_EMAIL,
      row.COLUMN_CUSTOMER_PASSWORD,
      row.COLUMN_CUSTOMER_REGISTRATION_DATE,
      row.COLUMN_CUSTOMER_CARDHOLDER_NAME,
      row.COLUMN_CUSTOMER_CARD_NUMBER,
      row.COLUMN_CUSTOMER_CVV,
      row.COLUMN_CUSTOMER_CARD_EXPIRATION,
      row.COLUMN_CUSTOMER_BILLING_ADDRESS_ID,
      row.COLUMN_CUSTOMER_ADDRESS_ID
    );

    return customer;
  } catch (error) {
    throw new Error(`Error fetching customer by id: ${error.message}`);
  }
}