// utils/codegen.js
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// generate random alpha-numeric code length between 6 and 8
function randomCode(len = 6) {
  let s = '';
  for (let i = 0; i < len; i++) {
    s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return s;
}

// try to produce a code of 6-8 characters; caller may check uniqueness
function generateRandom() {
  // pick length randomly 6,7,8
  const len = 6 + Math.floor(Math.random() * 3);
  return randomCode(len);
}

module.exports = { generateRandom };
