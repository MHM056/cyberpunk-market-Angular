const EMAIL_DOMAINS = ['bg', 'com'];

exports.validateUserData = (email, password) => {
    const domainString = EMAIL_DOMAINS.join('|');
    const emailRegExp = new RegExp(`[A-Za-z0-9.]{6,}.@gmail.(${domainString})`);
    const passwordRegExp = new RegExp(`[a-zA-Z0-9]`);


    if (email === '' || !emailRegExp.test(email)) {
        throw new Error('Invalid email!');
    }

    if (password.length < 4) {
        throw new Error('Password is too short!');
    }

    if (!passwordRegExp.test(password)) {
        throw new Error('Password must contain letters and digits only!');
    }
}