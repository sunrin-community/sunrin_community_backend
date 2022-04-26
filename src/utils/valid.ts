const valid = (name: string, username: string, email: string, password: string, cf_password: string) => {
    if (!name || !username || !email || !password) return 'Please add all fields.'

    if (!validateEmail(email)) return 'Invalid emails.'

    if (password.length < 6) return 'Password must be at least 6 characters.'

    if (password !== cf_password) return 'Confirm password did not match.'
}

const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid;