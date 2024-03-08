class Validators {

    static required(value) {
        return value !== undefined && value !== null && value !== '';
    }
    
    // Checks for a valid email address
    static email(value) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.trim());
    }
 
    static isValidDate(value) {
        return !isNaN(Date.parse(value));
    }

    static isFutureDate(value) {
        return new Date(value) > new Date();
    }

    static isPastDate(value) {
        return new Date(value) < new Date();
    }

    static isDateRangeValid(startDate, endDate) {
        return new Date(startDate) < new Date(endDate);
    }

    static isNumber(value) {
        return !isNaN(value);
    }

    static isPositiveNumber(value) {
        return value > 0;
    }

    static isNonNegativeNumber(value) {
        return value >= 0;
    }

    // Checks for Canadian postal code
    static isValidPostalCode(value) {
        return /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/.test(value.trim().toUpperCase());
    }

    // Checks for 10 digit number in the form of xxx-xxx-xxxx
    static isValidPhoneNumber(value) {
        return /^\d{3}-\d{3}-\d{4}$/.test(value.trim());
    }

    // Checks for 16 digit number in the form of xxxx-xxxx-xxxx-xxxx
    static isValidCreditCard(value) {
        return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(value.trim());
    }

    // Checks for 3 digit number
    static isValidCVV(value) {
        return /^\d{3}$/.test(value.trim());
    }

    // MM/YY
    static isValidExpiryDate(value) {
        return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value.trim());
    }

    // Checks for a valid name
    static isValidName(value) {
        return /^[a-zA-Z\s]*$/.test(value.trim());
    }

    // Checks for a valid password
    static isValidPassword(value) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value.trim());
    }
    
    
}