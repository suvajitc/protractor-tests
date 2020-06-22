/**
 * @author Suvajit Chakraborty
 */

var CalculatorHomePage = function() {
  var sleepTime = browser.params.calculator.sleepTime;
  var baseUrl = browser.params.calculator.baseUrl;
  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));
  var operation = element(by.model('operator'));
  var history = element.all(by.repeater('result in memory'));
  var until = protractor.ExpectedConditions;

  this.get = async function() {
    await browser.get(baseUrl);
  }

  this.getTitle = function() {
    return browser.getTitle();
  }

  this.getFirstNumber = function() {
    return firstNumber.getAttribute('value');
  }

  this.setFirstNumber = async function(a) {
    await firstNumber.sendKeys(a);
    browser.sleep(sleepTime);
  }

  this.getSecondNumber = function() {
    return secondNumber.getAttribute('value');
  }

  this.setSecondNumber = async function(b) {
    await secondNumber.sendKeys(b);
    browser.sleep(sleepTime);
  }

  this.getSelectedOption = function() {
    return operation.element(by.css('option:selected')).getText();
  }

  this.setSelectedOption = async function(text) {
    await operation.element(by.cssContainingText('option', text)).click();
    browser.sleep(sleepTime);
  }

  this.getResult = function() {
    browser.sleep(sleepTime);
    browser.wait(until.visibilityOf(latestResult), 5000, 'Element latest taking too long to be visible');
    return latestResult.getText();
  }

  this.getHistory = function() {
    browser.sleep(sleepTime);
    browser.wait(until.presenceOf(history), 5000, 'Element result in memory taking too long to appear in DOM');
    return history;
  }

  this.getHistoryCount = function() {
    return this.getHistory().count();
  }

  this.getHistoryTextByIndex = function(index) {
    return this.getHistory().get(index).getText();
  }

  this.getHistoryTextFirst = function() {
    return this.getHistory().first().getText();
  }

  this.getHistoryTextLast = function() {
    return this.getHistory().last().getText();
  }

  this.add = async function (a, b) {
    this.setSelectedOption('+');
    this.setFirstNumber(a);
    this.setSecondNumber(b);
    await goButton.click();
  }

  this.subtract = async function (a, b) {
    this.setSelectedOption('-');
    this.setFirstNumber(a);
    this.setSecondNumber(b);
    await goButton.click();
  }

  this.multiply = async function (a, b) {
    this.setSelectedOption('*');
    this.setFirstNumber(a);
    this.setSecondNumber(b);
    await goButton.click();
  }

  this.divide = async function (a, b) {
    this.setSelectedOption('/');
    this.setFirstNumber(a);
    this.setSecondNumber(b);
    await goButton.click();
  }

  this.modulo = async function (a, b) {
    this.setSelectedOption('%');
    this.setFirstNumber(a);
    this.setSecondNumber(b);
    await goButton.click();
  }
}
module.exports = new CalculatorHomePage();