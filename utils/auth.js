import { compare, hash } from "bcryptjs"
import { verify } from "jsonwebtoken";

async function hashPassword(password) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword
}

async function verifyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword);
    console.log(isValid)
    return isValid;
}

function verifyToken(token, secretKey) {
    try {
        const result = verify(token,secretKey )
        return {email: result.email}
        } catch (error) {
        return false
    }
}

export { hashPassword , verifyPassword , verifyToken}