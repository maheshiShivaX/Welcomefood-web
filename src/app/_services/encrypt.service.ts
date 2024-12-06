import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  /**
   * Decrypts the given encrypted data using the provided key and IV.
   * @param encryptedData The encrypted data (Base64 string).
   * @param secretKey The decryption key.
   * @param iv The initialization vector.
   * @returns The decrypted data, mapped to UserModel[].
   */


  descpt(encryptedData: string): any  {
    // Ensure encrypted data is in Base64 format
    const secretKey1 = CryptoJS.enc.Utf8.parse("uitsufdytuiysdifdsfdsfdhgtyuijkj");  // 32 bytes key (256-bit key)
    const iv1 = CryptoJS.enc.Utf8.parse("1234567890123456");  // 16 bytes IV (128-bit)
   
    const parsedCiphertext = CryptoJS.enc.Base64.parse(encryptedData);

    // Decrypt the data
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey1, {
      iv: iv1,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });

    // Convert decrypted data to string (UTF-8)
    const result = decryptedData.toString(CryptoJS.enc.Utf8);
  
    // Return the decrypted result
    return   JSON.parse(result);
};
}
