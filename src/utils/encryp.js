/**
 * 工具类
 */
import CryptoJS from 'crypto-js'
const key = CryptoJS.enc.Utf8.parse("@vanda1234567890");  
const iv = CryptoJS.enc.Utf8.parse('1234567890123456');   

// let keyStr = "@vanda1234567890"
//加密
// 
export function encrypt(word){ 
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
    //--------ECB-------------------
    // keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    // var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    // console.log(key,'key')
	// var srcs = CryptoJS.enc.Utf8.parse(word);
	// var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	// return encrypted.toString();
    
    
}
 
//解密  Pkcs7 Pkcs7 (the default)
// Iso97971
// AnsiX923
// Iso10126
// ZeroPadding
// NoPadding
export function decrypt(word){  
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7  });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
    //---------------ECB---------------------------------
    // keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
	// var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
	// var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	// return CryptoJS.enc.Utf8.stringify(decrypt).toString();


}