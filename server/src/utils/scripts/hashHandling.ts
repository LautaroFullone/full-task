import * as bcrypt from "bcryptjs"

async function generateHash(passwordPlain: string): Promise<string> {
    const hash = await bcrypt.hash(passwordPlain, 10)
    return hash;
}

async function compareHash(plain: string, hash: string): Promise<any> {
    return await bcrypt.compare(plain, hash);
}

export { generateHash, compareHash } 