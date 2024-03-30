const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const Address = require('../models/Address');
const Archive = require('../models/Archive');
const Chain = require('../models/Chain');
const Customer = require('../models/Customer');
const Employee = require('../models/Employee');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const { create } = require('domain');

ARCHIVE_TABLE                         = "ARCHIVE_TABLE";
COLUMN_ARCHIVE_ID                     = "COLUMN_ARCHIVE_ID";
COLUMN_ARCHIVE_HOTEL_ID               = "COLUMN_ARCHIVE_HOTEL_ID";
COLUMN_ARCHIVE_CUSTOMER_FIRST_NAME    = "COLUMN_ARCHIVE_CUSTOMER_FIRST_NAME";
COLUMN_ARCHIVE_CUSTOMER_LAST_NAME     = "COLUMN_ARCHIVE_CUSTOMER_LAST_NAME";
COLUMN_ARCHIVE_ROOM_NUMBER            = "COLUMN_ARCHIVE_ROOM_NUMBER";
COLUMN_ARCHIVE_CHECK_IN_DATE          = "COLUMN_ARCHIVE_CHECK_IN_DATE";
COLUMN_ARCHIVE_CHECK_OUT_DATE         = "COLUMN_ARCHIVE_CHECK_OUT_DATE";
COLUMN_ARCHIVE_BOOKING_DATE           = "COLUMN_ARCHIVE_BOOKING_DATE";

ADDRESS_TABLE                         = "ADDRESS_TABLE";
COLUMN_ADDRESS_ID                     = "COLUMN_ADDRESS_ID";
COLUMN_ADDRESS_STREET                 = "COLUMN_ADDRESS_STREET";
COLUMN_ADDRESS_APT                    = "COLUMN_ADDRESS_APT";
COLUMN_ADDRESS_POSTAL                 = "COLUMN_ADDRESS_POSTAL";
COLUMN_ADDRESS_PROVINCE               = "COLUMN_ADDRESS_PROVINCE";
COLUMN_ADDRESS_CITY                   = "COLUMN_ADDRESS_CITY";

CHAIN_TABLE                           = "CHAIN_TABLE";
COLUMN_CHAIN_ID                       = "COLUMN_CHAIN_ID";
COLUMN_CHAIN_NAME                     = "COLUMN_CHAIN_NAME";
COLUMN_CHAIN_ADDRESS_ID               = "COLUMN_CHAIN_ADDRESS_ID";
COLUMN_CHAIN_NUM_LOCATIONS            = "COLUMN_CHAIN_NUM_LOCATIONS";
COLUMN_CHAIN_EMAIL                    = "COLUMN_CHAIN_EMAIL";
COLUMN_CHAIN_PHONE_NUMBERS            = "COLUMN_CHAIN_PHONE_NUMBERS";

HOTEL_TABLE                           = "HOTEL_TABLE";
COLUMN_HOTEL_ID                       = "COLUMN_HOTEL_ID";
COLUMN_HOTEL_CHAIN_ID                 = "COLUMN_HOTEL_CHAIN_ID";
COLUMN_HOTEL_RATING                   = "COLUMN_HOTEL_RATING";
COLUMN_HOTEL_NUM_ROOMS                = "COLUMN_HOTEL_NUM_ROOMS";
COLUMN_HOTEL_ADDRESS_ID               = "COLUMN_HOTEL_ADDRESS_ID";
COLUMN_HOTEL_EMAIL                    = "COLUMN_HOTEL_EMAIL";
COLUMN_HOTEL_PHONE_NUMBERS            = "COLUMN_HOTEL_PHONE_NUMBERS";

EMPLOYEE_TABLE                        = "EMPLOYEE_TABLE";
COLUMN_EMPLOYEE_ID                    = "COLUMN_EMPLOYEE_ID";
COLUMN_EMPLOYEE_HOTEL_ID              = "COLUMN_EMPLOYEE_HOTEL_ID";
COLUMN_EMPLOYEE_FIRST_NAME            = "COLUMN_EMPLOYEE_FIRST_NAME";
COLUMN_EMPLOYEE_LAST_NAME             = "COLUMN_EMPLOYEE_LAST_NAME";
COLUMN_EMPLOYEE_USERNAME              = "COLUMN_EMPLOYEE_USERNAME";
COLUMN_EMPLOYEE_PASSWORD              = "COLUMN_EMPLOYEE_PASSWORD";
COLUMN_EMPLOYEE_ADDRESS_ID            = "COLUMN_EMPLOYEE_ADDRESS_ID";
COLUMN_EMPLOYEE_ROLE                  = "COLUMN_EMPLOYEE_ROLE";

ROOM_TABLE                            = "ROOM_TABLE";
COLUMN_ROOM_ID                        = "COLUMN_ROOM_ID";
COLUMN_ROOM_HOTEL_ID                  = "COLUMN_ROOM_HOTEL_ID";
COLUMN_ROOM_PRICE                     = "COLUMN_ROOM_PRICE";
COLUMN_ROOM_AMENITIES                 = "COLUMN_ROOM_AMENITIES";
COLUMN_ROOM_CAPACITY                  = "COLUMN_ROOM_CAPACITY";
COLUMN_ROOM_MOUNTAIN_VIEW             = "COLUMN_ROOM_MOUNTAIN_VIEW";
COLUMN_ROOM_SEA_VIEW                  = "COLUMN_ROOM_SEA_VIEW";
COLUMN_ROOM_EXTENDABLE                = "COLUMN_ROOM_EXTENDABLE";
COLUMN_ROOM_ISSUES                    = "COLUMN_ROOM_ISSUES";

CUSTOMER_TABLE                        = "CUSTOMER_TABLE";
COLUMN_CUSTOMER_ID                    = "COLUMN_CUSTOMER_ID";
COLUMN_CUSTOMER_IDENTIFICATION        = "COLUMN_CUSTOMER_IDENTIFICATION";
COLUMN_CUSTOMER_FIRST_NAME            = "COLUMN_CUSTOMER_FIRST_NAME";
COLUMN_CUSTOMER_LAST_NAME             = "COLUMN_CUSTOMER_LAST_NAME";
COLUMN_CUSTOMER_EMAIL                 = "COLUMN_CUSTOMER_EMAIL";
COLUMN_CUSTOMER_PASSWORD              = "COLUMN_CUSTOMER_PASSWORD";
COLUMN_CUSTOMER_CARDHOLDER_NAME       = "COLUMN_CUSTOMER_CARDHOLDER_NAME";
COLUMN_CUSTOMER_CARD_NUMBER           = "COLUMN_CUSTOMER_CARD_NUMBER";
COLUMN_CUSTOMER_CVV                   = "COLUMN_CUSTOMER_CVV";
COLUMN_CUSTOMER_CARD_EXPIRATION       = "COLUMN_CUSTOMER_CARD_EXPIRATION";
COLUMN_CUSTOMER_BILLING_ADDRESS_ID    = "COLUMN_CUSTOMER_BILLING_ADDRESS_ID";
COLUMN_CUSTOMER_ADDRESS_ID            = "COLUMN_CUSTOMER_ADDRESS_ID";

BOOKING_TABLE                         = "BOOKING_TABLE";
COLUMN_BOOKING_ID                     = "COLUMN_BOOKING_ID";
COLUMN_BOOKING_CUSTOMER_ID            = "COLUMN_BOOKING_CUSTOMER_ID";
COLUMN_BOOKING_EMPLOYEE_ID            = "COLUMN_BOOKING_EMPLOYEE_ID";
COLUMN_BOOKING_ROOM_ID                = "COLUMN_BOOKING_ROOM_ID";
COLUMN_BOOKING_ARCHIVE_ID             = "COLUMN_BOOKING_ARCHIVE_ID";
COLUMN_BOOKING_DATE_BOOKED            = "COLUMN_BOOKING_DATE_BOOKED";
COLUMN_BOOKING_CUSTOMER_NAME          = "COLUMN_BOOKING_CUSTOMER_NAME";
COLUMN_BOOKING_CHECK_IN_DATE          = "COLUMN_BOOKING_CHECK_IN_DATE";
COLUMN_BOOKING_CHECK_OUT_DATE         = "COLUMN_BOOKING_CHECK_OUT_DATE";
COLUMN_BOOKING_NUM_PEOPLE             = "COLUMN_BOOKING_NUM_PEOPLE";
COLUMN_BOOKING_IS_RENTING             = "COLUMN_BOOKING_IS_RENTING";
COLUMN_BOOKING_PAID_ONLINE            = "COLUMN_BOOKING_PAID_ONLINE";

function createDatabase() {
  console.log('Creating the database...');

  const dbPath = path.resolve(__dirname, 'database.db');
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error connecting to SQLite database:', err.message);
    } else {
      console.log('Connected to SQLite database in initDB.js');
    }
  });

  // CREATE THE ARCHIVE TABLE
  db.run(`CREATE TABLE ${ARCHIVE_TABLE} (
    ${COLUMN_ARCHIVE_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${COLUMN_ARCHIVE_CUSTOMER_FIRST_NAME} TEXT NOT NULL,
    ${COLUMN_ARCHIVE_CUSTOMER_LAST_NAME} TEXT NOT NULL,
    ${COLUMN_ARCHIVE_ROOM_NUMBER} INTEGER NOT NULL,
    ${COLUMN_ARCHIVE_CHECK_IN_DATE} TEXT NOT NULL,
    ${COLUMN_ARCHIVE_CHECK_OUT_DATE} TEXT NOT NULL,
    ${COLUMN_ARCHIVE_BOOKING_DATE} TEXT NOT NULL)`, function(err) {
      if (err) {
          console.error('Error creating Archive table:', err.message);
      } else {
          console.log('Archive table created successfully');
      }
  });

  // CREATE THE ADDRESS TABLE
  db.run(`CREATE TABLE ${ADDRESS_TABLE} (
    ${COLUMN_ADDRESS_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${COLUMN_ADDRESS_STREET} TEXT NOT NULL,
    ${COLUMN_ADDRESS_APT} TEXT NOT NULL,
    ${COLUMN_ADDRESS_POSTAL} TEXT NOT NULL,
    ${COLUMN_ADDRESS_PROVINCE} TEXT NOT NULL,
    ${COLUMN_ADDRESS_CITY} TEXT NOT NULL)`, function(err) {
      if (err) {
          console.error('Error creating Address table:', err.message);
      } else {
          console.log('Address table created successfully');
      }
  });

  // CREATE THE CHAIN TABLE
  db.run(`CREATE TABLE ${CHAIN_TABLE} (
    ${COLUMN_CHAIN_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${COLUMN_CHAIN_NAME} TEXT NOT NULL,
    ${COLUMN_CHAIN_ADDRESS_ID} INTEGER NOT NULL,
    ${COLUMN_CHAIN_NUM_LOCATIONS} INTEGER NOT NULL,
    ${COLUMN_CHAIN_EMAIL} TEXT NOT NULL,
    ${COLUMN_CHAIN_PHONE_NUMBERS} TEXT NOT NULL,
    FOREIGN KEY (${COLUMN_CHAIN_ADDRESS_ID}) REFERENCES ${ADDRESS_TABLE} (${COLUMN_ADDRESS_ID}))`, function(err) {
      if (err) {
          console.error('Error creating Chain table:', err.message);
      } else {
          console.log('Chain table created successfully');
      }
  });

  // CREATE THE HOTEL TABLE
  db.run(`CREATE TABLE ${HOTEL_TABLE} (
    ${COLUMN_HOTEL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${COLUMN_HOTEL_CHAIN_ID} INTEGER NOT NULL,
    ${COLUMN_HOTEL_RATING} FLOAT NOT NULL,
    ${COLUMN_HOTEL_NUM_ROOMS} INTEGER NOT NULL,
    ${COLUMN_HOTEL_ADDRESS_ID} INTEGER NOT NULL,
    ${COLUMN_HOTEL_EMAIL} TEXT NOT NULL,
    ${COLUMN_HOTEL_PHONE_NUMBERS} TEXT NOT NULL,
    FOREIGN KEY (${COLUMN_HOTEL_CHAIN_ID}) REFERENCES ${CHAIN_TABLE} (${COLUMN_CHAIN_ID}),
    FOREIGN KEY (${COLUMN_HOTEL_ADDRESS_ID}) REFERENCES ${ADDRESS_TABLE} (${COLUMN_ADDRESS_ID}))`, function(err) {
    if (err) {
        console.error('Error creating Hotel table:', err.message);
    } else {
        console.log('Hotel table created successfully');
    }
});

  // CREATE THE EMPLOYEE TABLE
  db.run(`CREATE TABLE ${EMPLOYEE_TABLE} (
    ${COLUMN_EMPLOYEE_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${COLUMN_EMPLOYEE_HOTEL_ID} INTEGER NOT NULL,
    ${COLUMN_EMPLOYEE_FIRST_NAME} TEXT NOT NULL,
    ${COLUMN_EMPLOYEE_LAST_NAME} TEXT NOT NULL,
    ${COLUMN_EMPLOYEE_USERNAME} TEXT NOT NULL,
    ${COLUMN_EMPLOYEE_PASSWORD} TEXT NOT NULL,
    ${COLUMN_EMPLOYEE_ADDRESS_ID} INTEGER NOT NULL,
    ${COLUMN_EMPLOYEE_ROLE} TEXT NOT NULL,
    FOREIGN KEY (${COLUMN_EMPLOYEE_HOTEL_ID}) REFERENCES ${HOTEL_TABLE} (${COLUMN_HOTEL_ID}),
    FOREIGN KEY (${COLUMN_EMPLOYEE_ADDRESS_ID}) REFERENCES ${ADDRESS_TABLE} (${COLUMN_ADDRESS_ID}))`, function(err) {
      if (err) {
          console.error('Error creating Employee table:', err.message);
      } else {
          console.log('Employee table created successfully');
      }
  });

  // CREATE THE ROOM TABLE
  db.run(`CREATE TABLE ${ROOM_TABLE} (
    ${COLUMN_ROOM_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${COLUMN_ROOM_HOTEL_ID} INTEGER NOT NULL,
    ${COLUMN_ROOM_PRICE} FLOAT NOT NULL,
    ${COLUMN_ROOM_AMENITIES} TEXT NOT NULL,
    ${COLUMN_ROOM_CAPACITY} INTEGER NOT NULL,
    ${COLUMN_ROOM_MOUNTAIN_VIEW} BOOLEAN NOT NULL,
    ${COLUMN_ROOM_SEA_VIEW} BOOLEAN NOT NULL,
    ${COLUMN_ROOM_EXTENDABLE} BOOLEAN NOT NULL,
    ${COLUMN_ROOM_ISSUES} TEXT NOT NULL,
    FOREIGN KEY (${COLUMN_ROOM_HOTEL_ID}) REFERENCES ${HOTEL_TABLE} (${COLUMN_HOTEL_ID}))`, function(err) {
      if (err) {
          console.error('Error creating Room table:', err.message);
      } else {
          console.log('Room table created successfully');
      }
  });

  // CREATE THE CUSTOMER TABLE
  db.run(`CREATE TABLE ${CUSTOMER_TABLE} (
    ${COLUMN_CUSTOMER_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${COLUMN_CUSTOMER_IDENTIFICATION} TEXT NOT NULL,
    ${COLUMN_CUSTOMER_FIRST_NAME} TEXT NOT NULL,
    ${COLUMN_CUSTOMER_LAST_NAME} TEXT NOT NULL,
    ${COLUMN_CUSTOMER_EMAIL} TEXT NOT NULL,
    ${COLUMN_CUSTOMER_PASSWORD} TEXT NOT NULL,
    ${COLUMN_CUSTOMER_CARDHOLDER_NAME} TEXT NOT NULL,
    ${COLUMN_CUSTOMER_CARD_NUMBER} TEXT NOT NULL,
    ${COLUMN_CUSTOMER_CVV} TEXT NOT NULL,
    ${COLUMN_CUSTOMER_CARD_EXPIRATION} TEXT NOT NULL,
    ${COLUMN_CUSTOMER_BILLING_ADDRESS_ID} INTEGER NOT NULL,
    ${COLUMN_CUSTOMER_ADDRESS_ID} INTEGER NOT NULL,
    FOREIGN KEY (${COLUMN_CUSTOMER_BILLING_ADDRESS_ID}) REFERENCES ${ADDRESS_TABLE} (${COLUMN_ADDRESS_ID}),
    FOREIGN KEY (${COLUMN_CUSTOMER_ADDRESS_ID}) REFERENCES ${ADDRESS_TABLE} (${COLUMN_ADDRESS_ID}))`, function(err) {
      if (err) {
          console.error('Error creating Customer table:', err.message);
      } else {
          console.log('Customer table created successfully');
      }
  });

  // CREATE THE BOOKING TABLE
  db.run(`CREATE TABLE ${BOOKING_TABLE} (
    ${COLUMN_BOOKING_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${COLUMN_BOOKING_CUSTOMER_ID} INTEGER NOT NULL,
    ${COLUMN_BOOKING_EMPLOYEE_ID} INTEGER,
    ${COLUMN_BOOKING_ROOM_ID} INTEGER NOT NULL,
    ${COLUMN_BOOKING_ARCHIVE_ID} INTEGER,
    ${COLUMN_BOOKING_DATE_BOOKED} TEXT NOT NULL,
    ${COLUMN_BOOKING_CUSTOMER_NAME} TEXT NOT NULL,
    ${COLUMN_BOOKING_CHECK_IN_DATE} TEXT NOT NULL,
    ${COLUMN_BOOKING_CHECK_OUT_DATE} TEXT NOT NULL,
    ${COLUMN_BOOKING_NUM_PEOPLE} INTEGER NOT NULL,
    ${COLUMN_BOOKING_IS_RENTING} BOOLEAN NOT NULL,
    ${COLUMN_BOOKING_PAID_ONLINE} BOOLEAN NOT NULL,
    FOREIGN KEY (${COLUMN_BOOKING_CUSTOMER_ID}) REFERENCES ${CUSTOMER_TABLE} (${COLUMN_CUSTOMER_ID}),
    FOREIGN KEY (${COLUMN_BOOKING_EMPLOYEE_ID}) REFERENCES ${EMPLOYEE_TABLE} (${COLUMN_EMPLOYEE_ID}),
    FOREIGN KEY (${COLUMN_BOOKING_ROOM_ID}) REFERENCES ${ROOM_TABLE} (${COLUMN_ROOM_ID}),
    FOREIGN KEY (${COLUMN_BOOKING_ARCHIVE_ID}) REFERENCES ${ARCHIVE_TABLE} (${COLUMN_ARCHIVE_ID}))`, function(err) {
      if (err) {
          console.error('Error creating Booking table:', err.message);
      } else {
          console.log('Booking table created successfully');
      }
  });

   closeDatabase(db);
}

function populateDatabase() {
  const dbPath = path.resolve(__dirname, 'database.db');
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error connecting to SQLite database:', err.message);
    } else {
      console.log('Connected to SQLite database in initDB.js');
    }
  });

  const a1 = new Address(1, "1234 Street", "123", "A1B2C3", "ON", "Ottawa");
  const a2 = new Address(2, "5678 Street", "456", "D4E5F6", "ON", "Toronto");
  const a3 = new Address(3, "91011 Street", "789", "G7H8I9", "AL", "Calgary");
  const a4 = new Address(4, "121314 Street", "1011", "J1K2L3", "SK", "Saskatoon");
  const a5 = new Address(5, "151617 Street", "1213", "M4N5O6", "QC", "Montreal");
  const a6 = new Address(6, "181920 Street", "1415", "P7Q8R9", "SK", "Regina");
  const a7 = new Address(7, "212223 Street", "1617", "S1T2U3", "NB", "St. John's");
  const a8 = new Address(8, "242526 Street", "1819", "V4W5X6", "ON", "Missisauga");
  const a9 = new Address(9, "272829 Street", "2021", "Y7Z8A9", "BC", "Vancouver");
  const a10 = new Address(10, "303132 Street", "2223", "B1C2D3", "AB", "Edmonton");
  const a11 = new Address(11, "333435 Street", "2425", "E4F5G6", "ON", "Ottawa");
  const a12 = new Address(12, "363738 Street", "2627", "H7I8J9", "ON", "Toronto");
  const a13 = new Address(13, "394041 Street", "2829", "K1L2M3", "AL", "Calgary");
  const a14 = new Address(14, "424344 Street", "3031", "N4O5P6", "SK", "Saskatoon");
  const a15 = new Address(15, "454647 Street", "3233", "Q7R8S9", "QC", "Montreal");
  const a16 = new Address(16, "484950 Street", "3435", "T1U2V3", "SK", "Regina");
  const a17 = new Address(17, "515253 Street", "3637", "W4X5Y6", "NB", "St. John's");
  const a18 = new Address(18, "545556 Street", "3839", "Z7A8B9", "ON", "Missisauga");
  const a19 = new Address(19, "575859 Street", "4041", "C1D2E3", "BC", "Vancouver");
  const a20 = new Address(20, "606162 Street", "4243", "F4G5H6", "AB", "Edmonton");
  const a21 = new Address(21, "636465 Street", "4445", "I7J8K9", "ON", "Ottawa");
  const a22 = new Address(22, "666768 Street", "4647", "L1M2N3", "ON", "Toronto");
  const a23 = new Address(23, "697071 Street", "4849", "O4P5Q6", "AL", "Calgary");
  const a24 = new Address(24, "727374 Street", "5051", "R7S8T9", "SK", "Saskatoon");
  const a25 = new Address(25, "757677 Street", "5253", "U1V2W3", "QC", "Montreal");
  const a26 = new Address(26, "787980 Street", "5455", "X4Y5Z6", "SK", "Regina");
  const a27 = new Address(27, "808182 Street", "5657", "A1B2C3", "NB", "St. John's");
  const a28 = new Address(28, "838485 Street", "5859", "D4E5F6", "ON", "Missisauga");
  const a29 = new Address(29, "868788 Street", "6061", "G7H8I9", "BC", "Vancouver");
  const a30 = new Address(30, "899091 Street", "6263", "J1K2L3", "AB", "Edmonton");
  const a31 = new Address(31, "929394 Street", "6465", "M4N5O6", "ON", "Ottawa");
  const a32 = new Address(32, "959697 Street", "6667", "P7Q8R9", "ON", "Toronto");
  const a33 = new Address(33, "9899100 Street", "6869", "S1T2U3", "AL", "Calgary");
  const a34 = new Address(34, "101102103 Street", "7071", "V4W5X6", "SK", "Saskatoon");
  const a35 = new Address(35, "104105106 Street", "7273", "Y7Z8A9", "QC", "Montreal");
  const a36 = new Address(36, "107108109 Street", "7475", "B1C2D3", "SK", "Regina");
  const a37 = new Address(37, "110111112 Street", "7677", "E4F5G6", "NB", "St. John's");
  const a38 = new Address(38, "113114115 Street", "7879", "H7I8J9", "ON", "Missisauga");
  const a39 = new Address(39, "116117118 Street", "8081", "K1L2M3", "BC", "Vancouver");
  const a40 = new Address(40, "119120121 Street", "8283", "N4O5P6", "AB", "Edmonton");
  const a41 = new Address(41, "122123124 Street", "8485", "Q7R8S9", "ON", "Ottawa");
  const a42 = new Address(42, "125126127 Street", "8687", "T1U2V3", "ON", "Toronto");
  const a43 = new Address(43, "128129130 Street", "8889", "W4X5Y6", "AL", "Calgary");
  const a44 = new Address(44, "131132133 Street", "9091", "Z7A8B9", "SK", "Saskatoon");
  const a45 = new Address(45, "134135136 Street", "9293", "C1D2E3", "QC", "Montreal");
  const a46 = new Address(46, "137138139 Street", "9495", "F4G5H6", "SK", "Regina");
  const a47 = new Address(47, "140141142 Street", "9697", "I7J8K9", "NB", "St. John's");
  const a48 = new Address(48, "143144145 Street", "9899", "L1M2N3", "ON", "Missisauga");
  const a49 = new Address(49, "146147148 Street", "100101", "O4P5Q6", "BC", "Vancouver");
  const a50 = new Address(50, "149150151 Street", "102103", "R7S8T9", "AB", "Edmonton");

  const addresses = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25, a26, a27, a28, a29, a30, a31, a32, a33, a34, a35, a36, a37, a38, a39, a40, a41, a42, a43, a44, a45, a46, a47, a48, a49, a50];

  const chain1 = new Chain(1, "Marriott", 7, 8, "support@marriot.com", ["1-800-123-4567", "1-800-765-4321"]);
  const chain2 = new Chain(2, "Hilton", 8, 8, "support@hilton.com", ["1-800-987-6543", "1-800-456-7890"]);
  const chain3 = new Chain(3, "Best Western", 9, 8, "support@bestwestern.com", ["1-800-654-3210", "1-800-321-6540"]);
  const chain4 = new Chain(4, "Holiday Inn", 10, 8, "support@holidayinn.com", ["1-800-789-1234", "1-800-234-7891"]);
  const chain5 = new Chain(5, "Sheraton", 11, 8, "support@sheraton.com", ["1-800-456-7891", "1-800-789-1234"]);

  const chains = [chain1, chain2, chain3, chain4, chain5];

  const marriot1 = new Hotel(1, 1, 4, 5, 12, "location1@marriot.com", "1-800-123-4567");
  const marriot2 = new Hotel(2, 1, 5, 5, 13, "location2@marriot.com", "1-800-765-4321");
  const marriot3 = new Hotel(3, 1, 3, 5, 14, "location3@marriot.com", "1-800-987-6543");
  const marriot4 = new Hotel(4, 1, 4, 5, 15, "location4@marriot.com", "1-800-456-7890");
  const marriot5 = new Hotel(5, 1, 4, 5, 16, "location5@marriot.com", "1-800-654-3210");

  const hilton1 = new Hotel(6, 2, 4, 5, 17, "location1@hilton.com", "1-800-321-6540");
  const hilton2 = new Hotel(7, 2, 4, 5, 18, "location2@hilton.com", "1-800-789-1234");
  const hilton3 = new Hotel(8, 2, 5, 5, 19, "location3@hilton.com", "1-800-234-7891");
  const hilton4 = new Hotel(9, 2, 3, 5, 20, "location4@hilton.com", "1-800-456-7891");
  const hilton5 = new Hotel(10, 2, 5, 5, 21, "location5@hilton.com", "1-800-789-1234");

  const bestWestern1 = new Hotel(11, 3, 2, 5, 22, "location1@bestwestern.com", "1-800-123-4567");
  const bestWestern2 = new Hotel(12, 3, 3, 5, 23, "location2@bestwestern.com", "1-800-765-4321");
  const bestWestern3 = new Hotel(13, 3, 5, 5, 24, "location3@bestwestern.com", "1-800-987-6543");
  const bestWestern4 = new Hotel(14, 3, 5, 5, 25, "location4@bestwestern.com", "1-800-456-7890");
  const bestWestern5 = new Hotel(15, 3, 4, 5, 26, "location5@bestwestern.com", "1-800-654-3210");

  const holidayInn1 = new Hotel(16, 4, 3, 5, 27, "location1@holidayinn.com", "1-800-321-6540");
  const holidayInn2 = new Hotel(17, 4, 4, 5, 28, "location2@holidayinn.com", "1-800-789-1234");
  const holidayInn3 = new Hotel(18, 4, 5, 5, 29, "location3@holidayinn.com", "1-800-234-7891");
  const holidayInn4 = new Hotel(19, 4, 5, 5, 30, "location4@holidayinn.com", "1-800-456-7891");
  const holidayInn5 = new Hotel(20, 4, 4, 5, 31, "location5@holidayinn.com", "1-800-789-1234");

  const sheraton1 = new Hotel(21, 5, 5, 5, 32, "location1@sheraton.com", "1-800-123-4567");
  const sheraton2 = new Hotel(22, 5, 4, 5, 33, "location2@sheraton.com", "1-800-765-4321");
  const sheraton3 = new Hotel(23, 5, 3, 5, 34, "location3@sheraton.com", "1-800-987-6543");
  const sheraton4 = new Hotel(24, 5, 5, 5, 35, "location4@sheraton.com", "1-800-456-7890");
  const sheraton5 = new Hotel(25, 5, 4, 5, 36, "location5@sheraton.com", "1-800-654-3210");

  const hotels = [marriot1, marriot2, marriot3, marriot4, marriot5, hilton1, hilton2, hilton3, hilton4, hilton5, bestWestern1, bestWestern2, bestWestern3, bestWestern4, bestWestern5, holidayInn1, holidayInn2, holidayInn3, holidayInn4, holidayInn5, sheraton1, sheraton2, sheraton3, sheraton4, sheraton5];

  const e2 = new Employee(2, 2, "Max", "Verstappen", "maxverstappen", "Password1!", 27, "Front Desk");
  const e3 = new Employee(3, 3, "Lewis", "Hamilton", "lewishamilton", "Password1!", 28, "Manager");
  const e4 = new Employee(4, 4, "Sebastian", "Vettel", "sebastianvettel", "Password1!", 29, "Front Desk");
  const e5 = new Employee(5, 5, "Charles", "Leclerc", "charlesleclerc", "Password1!", 30, "Manager");
  const e6 = new Employee(6, 6, "Valtteri", "Bottas", "valtteribottas", "Password1!", 31, "Front Desk");
  const e7 = new Employee(7, 7, "Daniel", "Ricciardo", "danielricciardo", "Password1!", 32, "Manager");
  const e8 = new Employee(8, 8, "Lando", "Norris", "landonorris", "Password1!", 33, "Front Desk");
  const e9 = new Employee(9, 9, "Carlos", "Sainz", "carlossainz", "Password1!", 34, "Manager");
  const e10 = new Employee(10, 10, "Fernando", "Alonso", "fernandoalonso", "Password1!", 35, "Front Desk");
  const e11 = new Employee(11, 11, "Esteban", "Ocon", "estebaonocon", "Password1!", 36, "Manager");
  const e12 = new Employee(12, 12, "Kimi", "Raikkonen", "kimiraikkonen", "Password1!", 37, "Front Desk");
  const e13 = new Employee(13, 13, "Antonio", "Giovinazzi", "antoniogiovinazzi", "Password1!", 38, "Manager");
  const e14 = new Employee(14, 14, "Mick", "Schumacher", "mickschumacher", "Password1!", 39, "Front Desk");
  const e15 = new Employee(15, 15, "Nikita", "Mazepin", "nikitamazepin", "Password1!", 40, "Manager");
  const e16 = new Employee(16, 16, "Lebron", "James", "lebronjames", "Password1!", 41, "Front Desk");
  const e17 = new Employee(17, 17, "Anthony", "Davis", "anthonydavis", "Password1!", 42, "Manager");
  const e18 = new Employee(18, 18, "Russell", "Westbrook", "russellwestbrook", "Password1!", 43, "Front Desk");
  const e19 = new Employee(19, 19, "James", "Harden", "jamesharden", "Password1!", 44, "Manager");
  const e20 = new Employee(20, 20, "Kevin", "Durant", "kevindurant", "Password1!", 45, "Front Desk");
  const e21 = new Employee(21, 21, "Kyrie", "Irving", "kyrieirving", "Password1!", 46, "Manager");
  const e22 = new Employee(22, 22, "Stephen", "Curry", "stephencurry", "Password1!", 47, "Front Desk");
  const e23 = new Employee(23, 23, "Klay", "Thompson", "klaythompson", "Password1!", 48, "Manager");
  const e24 = new Employee(24, 24, "Draymond", "Green", "draymondgreen", "Password1!", 49, "Front Desk");
  const e25 = new Employee(25, 25, "Andrew", "Wiggins", "andrewwiggins", "Password1!", 50, "Manager");

  const employees = [e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15, e16, e17, e18, e19, e20, e21, e22, e23, e24, e25];

  const marriotRoom1 = new Room(1, 1, 100, "TV, Fridge, Microwave", 2, true, false, true, "None");
  const marriotRoom2 = new Room(2, 1, 150, "TV, Fridge, Microwave", 5, true, false, true, "None");
  const marriotRoom3 = new Room(3, 1, 200, "TV, Fridge, Microwave", 3, true, false, true, "None");
  const marriotRoom4 = new Room(4, 1, 250, "TV, Fridge, Microwave", 4, true, false, true, "None");
  const marriotRoom5 = new Room(5, 1, 300, "TV, Fridge, Microwave", 2, true, false, true, "None");

  const hiltonRoom1 = new Room(6, 2, 100, "TV, Fridge, Microwave", 2, true, false, true, "None");
  const hiltonRoom2 = new Room(7, 2, 150, "TV, Fridge, Microwave", 5, true, false, true, "None");
  const hiltonRoom3 = new Room(8, 2, 200, "TV, Fridge, Microwave", 3, true, false, true, "None");
  const hiltonRoom4 = new Room(9, 2, 250, "TV, Fridge, Microwave", 4, true, false, true, "None");
  const hiltonRoom5 = new Room(10, 2, 300, "TV, Fridge, Microwave", 2, true, false, true, "None");

  const bestWesternRoom1 = new Room(11, 3, 100, "TV, Fridge, Microwave", 2, true, false, true, "None");
  const bestWesternRoom2 = new Room(12, 3, 150, "TV, Fridge, Microwave", 5, true, false, true, "None");
  const bestWesternRoom3 = new Room(13, 3, 200, "TV, Fridge, Microwave", 3, true, false, true, "None");
  const bestWesternRoom4 = new Room(14, 3, 250, "TV, Fridge, Microwave", 4, true, false, true, "None");
  const bestWesternRoom5 = new Room(15, 3, 300, "TV, Fridge, Microwave", 2, true, false, true, "None");

  const holidayInnRoom1 = new Room(16, 4, 100, "TV, Fridge, Microwave", 2, true, false, true, "None");
  const holidayInnRoom2 = new Room(17, 4, 150, "TV, Fridge, Microwave", 5, true, false, true, "None");
  const holidayInnRoom3 = new Room(18, 4, 200, "TV, Fridge, Microwave", 3, true, false, true, "None");
  const holidayInnRoom4 = new Room(19, 4, 250, "TV, Fridge, Microwave", 4, true, false, true, "None");
  const holidayInnRoom5 = new Room(20, 4, 300, "TV, Fridge, Microwave", 2, true, false, true, "None");

  const sheratonRoom1 = new Room(21, 5, 100, "TV, Fridge, Microwave", 2, true, false, true, "None");
  const sheratonRoom2 = new Room(22, 5, 150, "TV, Fridge, Microwave", 5, true, false, true, "None");
  const sheratonRoom3 = new Room(23, 5, 200, "TV, Fridge, Microwave", 3, true, false, true, "None");
  const sheratonRoom4 = new Room(24, 5, 250, "TV, Fridge, Microwave", 4, true, false, true, "None");
  const sheratonRoom5 = new Room(25, 5, 300, "TV, Fridge, Microwave", 2, true, false, true, "None");

  const rooms = [marriotRoom1, marriotRoom2, marriotRoom3, marriotRoom4, marriotRoom5, hiltonRoom1, hiltonRoom2, hiltonRoom3, hiltonRoom4, hiltonRoom5, bestWesternRoom1, bestWesternRoom2, bestWesternRoom3, bestWesternRoom4, bestWesternRoom5, holidayInnRoom1, holidayInnRoom2, holidayInnRoom3, holidayInnRoom4, holidayInnRoom5, sheratonRoom1, sheratonRoom2, sheratonRoom3, sheratonRoom4, sheratonRoom5];

  const c1 = new Customer(1, "842803713", "John", "Doe", "email@gmail.com", "Password1!", "John Doe", "1415064812040635", "798", "2026-10-13", 1, 1);
  const c2 = new Customer(2, "521741541", "Jane", "Doe", "jane@gmail.com", "Password1!", "Jane Doe", "7061703586553058", "992", "2025-07-08", 2, 2);
  const c3 = new Customer(3, "281372011", "John", "Smith", "johnsmith@gmail.com", "Password1!", "John Smith", "0795504666575185", "199", "2025-04-15", 3, 3);
  const c4 = new Customer(4, "767940234", "Jane", "Smith", "janesmith@gmail.com", "Password1!", "Jane Smith", "8508741780880762", "462", "2023-11-21", 4, 4);
  const c5 = new Customer(5, "030023040", "John", "Johnson", "johnjohnson@gmail.com", "Password1!", "John Johnson", "1234567890123456", "123", "2024-12-31", 5, 5);
  const c6 = new Customer(6, "484014832", "Jane", "Johnson", "janejohnson@gmail.com", "Password1!", "Jane Johnson", "9876543210987654", "987", "2025-01-01", 6, 6);

  const customers = [c1, c2, c3, c4, c5, c6];

  const b1 = new Booking(1, 1, 2, 1, 1, "2021-01-01", "John Doe", "2021-01-01", "2021-01-15", 2, true, true);

  const bookings = [b1];

  const archive = new Archive(1, "John", "Doe", 101, "2021-01-01", "2021-01-15", "2020-12-01");

  console.log('Inserting addresses into the database');
  //for loop inserting addresses into the database
  for (const a of addresses) {
    db.run(`INSERT INTO ${ADDRESS_TABLE} 
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
  }


  console.log('Inserting chains into the database');
  //for loop inserting chains into the database
  for (let c of chains) {
    const phoneNumbers = c.getPhoneNumbers();
    //set phone numbers to be a string of the array
    c.setPhoneNumbers(phoneNumbers.join(', '));
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

  //for loop inserting hotels into the database
  for (let h of hotels) {
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

  //for loop inserting employees into the database
  for (let e of employees) {
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

  //for loop inserting rooms into the database
  for (let r of rooms) {
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

  //for loop inserting customers into the database
  for (let c of customers) {
    db.run(`INSERT INTO ${CUSTOMER_TABLE} 
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
  }

  //for loop inserting bookings into the database
  for (let b of bookings) {
    db.run(`INSERT INTO ${BOOKING_TABLE} 
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
  }

  //inserting archive into the database
  db.run(`INSERT INTO ${ARCHIVE_TABLE} 
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

function createAdmin() {
  const dbPath = path.resolve(__dirname, 'database.db');
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error connecting to SQLite database:', err.message);
    } else {
      console.log('Connected to SQLite database in initDB.js');
    }
  });

  const admin = new Employee(26, -1, "System", "Administrator", "admin", "admin", -1, "Admin");
  db.run(`INSERT INTO ${EMPLOYEE_TABLE} 
                    (${COLUMN_EMPLOYEE_HOTEL_ID}, 
                      ${COLUMN_EMPLOYEE_FIRST_NAME}, 
                      ${COLUMN_EMPLOYEE_LAST_NAME}, 
                      ${COLUMN_EMPLOYEE_USERNAME}, 
                      ${COLUMN_EMPLOYEE_PASSWORD}, 
                      ${COLUMN_EMPLOYEE_ADDRESS_ID}, 
                      ${COLUMN_EMPLOYEE_ROLE}) 
                      VALUES (?, ?, ?, ?, ?, ?, ?)`, [admin.getHotelId(), 
                                                      admin.getFirstName(), 
                                                      admin.getLastName(), 
                                                      admin.getUserName(), 
                                                      admin.getPassword(), 
                                                      admin.getAddressId(), 
                                                      admin.getRole()], function(err) {
                        if (err) {
                            // Handle the error here
                            console.error('Error inserting Admin:', err.message);
                        } else {
                            console.log('Admin inserted successfully');
                            // Handle success here if needed
                        }
                    });

  closeDatabase(db);
}

function closeDatabase(db) {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database closed successfully');
    }
  });
}

module.exports = {
  createDatabase: createDatabase,
  populateDatabase: populateDatabase,
  closeDatabase: closeDatabase, 
  createAdmin: createAdmin
};

