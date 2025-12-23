import CryptoJS from "crypto-js";

export const  decrypt = (key,text) => {
    // Crear un vector de inicialización de 16 bytes (128 bits) de ceros
    const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");

    // Convertir la clave y el texto en formatos de CryptoJS
    const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
    const encryptedText = CryptoJS.enc.Base64.parse(text);

    // Desencriptar usando AES con modo CBC y padding PKCS7
    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: encryptedText },
        keyUtf8,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    // Convertir el resultado de vuelta a texto
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export const  encrypt = (key,text) => {
    // Crear un vector de inicialización de 16 bytes (128 bits) de ceros
    const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");

    // Convertir la clave a formato de CryptoJS
    const keyUtf8 = CryptoJS.enc.Utf8.parse(key);

    // Encriptar el texto usando AES con modo CBC y padding PKCS7
    const encrypted = CryptoJS.AES.encrypt(text, keyUtf8, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // Retornar el texto encriptado en base64
    return encrypted.toString();
}

export const keyEncryptDecrypt="Tuclave.uniminuto.edu.co"