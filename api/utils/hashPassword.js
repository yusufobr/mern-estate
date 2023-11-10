import bcrypt from 'bcrypt';

async function hashPassword(password) {
    try {
        const hash = await bcrypt.hash(password, 10);
        console.log(hash);
        return hash;
    } catch (error) {
        console.error(error);
    }
}

export default hashPassword;

// Usage
// hashPassword('myPassword').then(hash => console.log(hash));