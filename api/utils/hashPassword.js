import bcrypt from 'bcrypt';
const saltRounds = 10; // This is the cost factor for the hashing function.

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error(error);
    }
}

export default hashPassword;

// Usage
// hashPassword('myPassword').then(hash => console.log(hash));