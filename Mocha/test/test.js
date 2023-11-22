
const assert = require('chai').assert;

const { reverseString, capitalizeWords, countVowels } = require('./stringManipulator');

describe('String Manipulator', function() {

  it('should reverse a string', function() {
    assert.equal(reverseString('hello'), 'olleh');
    assert.equal(reverseString('world'), 'dlrow');
  });


  it('should capitalize the first letter of each word', function() {
    assert.equal(capitalizeWords('hello world'), 'Hello World');
    assert.equal(capitalizeWords('javascript is awesome'), 'Javascript Is Awesome');
  });

  
  it('should count vowels in a string', function() {
    assert.equal(countVowels('hello'), 2);
    assert.equal(countVowels('world'), 1);
    assert.equal(countVowels('javascript'), 3);
  });

});
