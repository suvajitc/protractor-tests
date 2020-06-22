/**
 * @author Suvajit Chakraborty
 */
// spec.js
var calculatorHomePage = require('../page/calculator_home_page.js')
describe('Super Calculator App', function() {
  beforeEach(function() {
    calculatorHomePage.get();
  });

  it('should have a title', function() {
    expect(calculatorHomePage.getTitle()).toEqual('Super Calculator');
  });

  it('should add five and six', function() {
    calculatorHomePage.add(5, 6)
    expect(calculatorHomePage.getResult()).toEqual('11');
  });

  it('should subtract three from eight', function() {
    calculatorHomePage.subtract(8, 3)
    expect(calculatorHomePage.getResult()).toEqual('5');
  });

  it('should multiply two with seven', function() {
    calculatorHomePage.multiply(2, 7)
    expect(calculatorHomePage.getResult()).toEqual('14');
  });

  it('should divide nine by three', function() {
    calculatorHomePage.divide(9, 3)
    expect(calculatorHomePage.getResult()).toEqual('3');
  });

  it('should modulo eleven by five', function() {
    calculatorHomePage.modulo(11, 5)
    expect(calculatorHomePage.getResult()).toEqual('1');
  });

  it('should read the value from an input', function() {
    calculatorHomePage.setFirstNumber(6);
    expect(calculatorHomePage.getFirstNumber()).toEqual('6');
  });

  it('should have a history', function() {
    calculatorHomePage.add(2, 3);
    calculatorHomePage.subtract(12, 5);
    calculatorHomePage.multiply(4, 3);
    calculatorHomePage.divide(8, 2);
    calculatorHomePage.modulo(11, 3);

    expect(calculatorHomePage.getHistoryCount()).toEqual(5);
    expect(calculatorHomePage.getHistoryTextFirst()).toContain('11 % 3');
    expect(calculatorHomePage.getHistoryTextLast()).toContain('2 + 3');
    expect(calculatorHomePage.getHistoryTextByIndex(2)).toContain('4 * 3');
  });
});
