import CryptoJS from "crypto-js";


const useCipher = () => {
  const cipher_key = process.env.REACT_APP_CRYPT_KEY as string;

  function encode(data:any){
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      cipher_key
    ).toString();
  }
  function decode(data:string){
    return JSON.parse(
      CryptoJS.AES.decrypt(data, cipher_key).toString(
        CryptoJS.enc.Utf8
      )
    );
  }



  return {
    encode,
    decode,
  };
};

export default useCipher;
