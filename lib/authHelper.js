import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
    let saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

export function loginValidate(values) {
    const errors = {};

    //validation for emailOrUsername
    if (!values.email) {
        errors.email = 'Email required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email';
    }
    //validation for password
    if (!values.password) {
        errors.password = "Password required";
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Must be greater than 8 and less than 20";
    } else if (values.password.includes(" ")) {
        errors.password = "Invalid password";
    }

    return errors;
}

export function registerValidate(values) {
    const errors = {};
    if (!values.name) {
        errors.name = "Name is required";
    } else if (/[^\w\s]/.test(values.name)) {
        errors.name = "Invalid name";
    }

    if (!values.email) {
        errors.email = 'Email required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email';
    }

    if (!values.password) {
        errors.password = "Password required";
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Must be greater than 8 and less than 20";
    } else if (values.password.includes(" ")) {
        errors.password = "Invalid password";
    }

    //validate confirm password
    if (!values.cpassword) {
        errors.cpassword = "Cpassword required";
    } else if (values.password !== values.cpassword) {
        errors.cpassword = "Passwords do not match";
    } else if (values.password.includes(" ")) {
        errors.cpassword = "Invalid confirm password";
    }

    return errors;
}

export function itemValidate(values) {
    const errors = {};
    if (!values.name) {
        errors.name = "name is required";
    } else if (/[^\w\s]/.test(values.name)) {
        errors.name = "Invalid name";
    }

    if (!values.price) {
        errors.price = "price is required";
    } else if (/[^\d.]/.test(values.price)) {
        errors.price = "Invalid price: contains symbols or whitespace";
    }

    if (!values.amount) {
        errors.amount = "price is required";
    } else if (/[^\d]/.test(values.amount)) {
        errors.amount = "Invalid Amount: contains symbols or whitespace";
    }

    return errors;
}