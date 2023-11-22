
function reverseString(str) {
  
  return str.split('').reverse().join('');
}

function capitalizeWords(str) {

  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function countVowels(str) {
  
  const vowels = str.match(/[aeiou]/gi);
  return vowels ? vowels.length : 0;
}

module.exports = { reverseString, capitalizeWords, countVowels };
