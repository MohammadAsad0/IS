const crypto = require('crypto');

const encrypt = (text) => {
    const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, process.env.SALT_NAME, parseInt(process.env.SALT_ROUNDS));

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(process.env.ENCRYPTION_ALGORITHM, key, iv);
    var encrypted = cipher.update(text, "utf-8", 'hex') + cipher.final('hex');

    return { iv: iv.toString('hex'), encryptedData: encrypted};
}

const decrypt = (text) => {
    const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, process.env.SALT_NAME, parseInt(process.env.SALT_ROUNDS));

    let iv = Buffer.from(text.iv, 'hex');

    let encryptedText = Buffer.from(text.encryptedData, 'hex');

    let decipher = crypto.createDecipheriv(process.env.ENCRYPTION_ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

module.exports = {
    encrypt,
    decrypt
}