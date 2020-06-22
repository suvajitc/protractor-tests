/**
 * @author Suvajit Chakraborty
 */

var AngularHomePage = function() {
  var sleepTime = browser.params.angular.sleepTime;;
  var baseUrl = browser.params.angular.baseUrl;
  var until = protractor.ExpectedConditions;

  // Find the element with ng-model matching 'yourName' - this will
  // find the <input type="text" ng-model="yourName"/> element - and then
  // type 'Julie' into it.
  var yourName = element(by.model('yourName'));

  // Find the element with binding matching 'yourName' - this will
  // find the <h1>Hello {{yourName}}!</h1> element.
  var greeting = element(by.binding('yourName'));
  var todoList = element.all(by.repeater('todo in todoList.todos'));
  var todoSummary = element(by.binding('todoList.remaining()'));
  var todoAddTextBox = element(by.model('todoList.todoText'));
  var todoAddButton = element(by.xpath('//input[@class="btn-primary" and @value="add"]'));
  var archiveLink = element(by.linkText('archive'));

  this.get = async function() {
    // Load the AngularJS homepage.
    await browser.get(baseUrl);
    browser.sleep(sleepTime);
  }

  // Find the element with ng-model matching 'yourName' - this will
  // find the <input type="text" ng-model="yourName"/> element - and then
  // type 'Julie' into it.
  this.setGreeting = async function(text) {
    await yourName.sendKeys(text);
  }

  this.getGreeting = function() {
    return greeting.getText();
  }

  this.getTodoSummary = function() {
    browser.wait(until.presenceOf(todoSummary), 1000, 'Element todo summary taking too long to appear in DOM');
    return todoSummary.getText();
  }

  this.getTodos = function() {
    //browser.sleep(sleepTime);
    browser.wait(until.presenceOf(todoList), 1000, 'Element todo list taking too long to appear in DOM');
    return todoList;
  }

  this.getTodosCount = function() {
    return this.getTodos().count();
  }

  this.getCheckedTodosCount = function() {
    return this.getTodos().filter(function(elem, index) {
      return elem.element(by.tagName('label')).element(by.model('todo.done')).isSelected().then(function (isSelected) {
        return isSelected;
      });
    }).count();
  }

  this.getTodoTextByIndex = function(index) {
    return this.getTodos().get(index).getText();
  }

  this.getTodoTextFirst = function() {
    return this.getTodos().first().getText();
  }

  this.getTodoTextLast = function() {
    return this.getTodos().last().getText();
  }

  this.clickTodoCheckBox = function(index) {
    this.getTodos().get(index).element(by.tagName('label')).element(by.model('todo.done')).click();
  }

  this.isTodoCheckBoxSelected = function(index) {
    return this.getTodos().get(index).element(by.tagName('label')).element(by.model('todo.done')).isSelected();
  }

  this.getTodoCheckBoxTextStyle = function(index) {
    return this.getTodos().get(index).element(by.tagName('label')).element(by.tagName('span')).getAttribute('class');
  }

  this.addTodoItem = function(todoItem) {
    browser.wait(until.presenceOf(todoAddTextBox), 1000, 'Element todo add text box taking too long to appear in DOM');
    browser.wait(until.presenceOf(todoAddButton), 1000, 'Element todo add button taking too long to appear in DOM');
    todoAddTextBox.sendKeys(todoItem);
    todoAddButton.click();
  }

  this.clickArchiveLink = function() {
    browser.wait(until.presenceOf(archiveLink), 1000, 'Element archive link is taking too long to appear in DOM');
    archiveLink.click();
  }
}
module.exports = new AngularHomePage();