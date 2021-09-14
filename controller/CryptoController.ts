import crypto from "crypto";
const serverSecret = "My Secret Server Code qqqqqqqqqqqqqqqqqqqqqqqqqq";

export const secret = (userSecret: string) => {
  return (userSecret + serverSecret).substr(0, 32);
};

const encrypt = (password: string, userSecret: string = "def") => {
  try {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv(
      "aes-256-ctr",
      Buffer.from(secret(userSecret)),
      iv
    );

    const encryptedPassword = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);

    return {
      iv: iv.toString("hex"),
      password: encryptedPassword.toString("hex"),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const decrypt = (
  encryption: { iv: string; password: string },
  userSecret: string = "def"
) => {
  try {
    const decipher = crypto.createDecipheriv(
      "aes-256-ctr",
      Buffer.from(secret(userSecret)),
      Buffer.from(encryption.iv, "hex")
    );

    const decryptedPassword = Buffer.concat([
      decipher.update(Buffer.from(encryption.password, "hex")),
      decipher.final(),
    ]);

    return decryptedPassword.toString();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const pass = "123456";

const enc = encrypt(pass);

if(enc){
    console.log("Enc : ", enc.password);
    console.log("IV : ", enc.iv);
    try {
      console.log("Dec : ", decrypt({ iv: enc.iv + "", password: enc.password }));
    } catch (error) {
      console.log(error);
    }
}

console.log("Cont.");
