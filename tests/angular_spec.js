/**
 * @author Suvajit Chakraborty
 */

var angularHomePage = require('../page/angular_home_page.js')
describe('angularjs homepage', function() {
  beforeEach(function() {
    angularHomePage.get();
  });

  it('should greet the named user', function() {
    var name = browser.params.angular.greeting.name;
    angularHomePage.setGreeting(name);
    // Assert that the text element has the expected value.
    // Protractor patches 'expect' to understand promises.
    expect(angularHomePage.getGreeting()).toEqual('Hello ' + name + '!');
  });

  it ('should check the number of todo items', function() {
    let totalTodoItems = angularHomePage.getTodosCount();
    expect(totalTodoItems).toBe(2);

    let checkedTodoCount = angularHomePage.getCheckedTodosCount();
    expect(checkedTodoCount).toBe(1);

    let todoSummary = angularHomePage.getTodoSummary();
    expect(todoSummary).toBe('1 of 2 remaining');
  });

  it ('should show learn AngularJS as first todo item', function() {
    let firstRowText = angularHomePage.getTodoTextFirst();
    expect(firstRowText).toBe('learn AngularJS');
  });

  it ('should show build an AngularJS app as second todo item', function() {
    let secondRowText = angularHomePage.getTodoTextByIndex(1);
    expect(secondRowText).toBe('build an AngularJS app');
  });

  it ('should add new todo item in todo list', function() {
    angularHomePage.addTodoItem('my todo item');
    let lastRowText = angularHomePage.getTodoTextLast();
    expect(lastRowText).toBe('my todo item');

    let totalTodoItems = angularHomePage.getTodosCount();
    expect(totalTodoItems).toBe(3);

    let todoSummary = angularHomePage.getTodoSummary();
    expect(todoSummary).toBe('2 of 3 remaining');
  });

  it ('should change remaining count when a todo item is checked', function() {
    // Create a new to do item
    angularHomePage.addTodoItem('new todo item');
    let lastRowText = angularHomePage.getTodoTextLast();
    expect(lastRowText).toBe('new todo item');
    // Click this to do item, should be at index 2
    angularHomePage.clickTodoCheckBox(2);
    // Check that the checkbox is selected
    expect(angularHomePage.isTodoCheckBoxSelected(2)).toBe(true);
    // Check that the style of the to item text has changed
    expect(angularHomePage.getTodoCheckBoxTextStyle(2)).toBe('done-true');
    // Check that the summary is now changed to 1 of 3 remaining
    expect(angularHomePage.getTodoSummary()).toBe('1 of 3 remaining');
  });

  it ('should remove a done todo item when archive link is clicked', function() {
    // When page is loaded the first to do is already clicked as done
    angularHomePage.clickArchiveLink();
    // Check that the summary is now changed to 1 of 3 remaining
    expect(angularHomePage.getTodoSummary()).toBe('1 of 1 remaining');
  });

  it ('should remove all done todo items when archive link is clicked', function() {
    // When page is loaded the first to do is already clicked as done, add 2 more to dos and check one of them as done
    angularHomePage.addTodoItem('new todo item1');
    angularHomePage.addTodoItem('new todo item2');
    let lastRowText = angularHomePage.getTodoTextLast();
    expect(lastRowText).toBe('new todo item2');
    // Click this to do item, should be at index 3
    angularHomePage.clickTodoCheckBox(3);
    // Check that the checkbox is selected
    expect(angularHomePage.isTodoCheckBoxSelected(3)).toBe(true);
    // Check that the style of the to item text has changed
    expect(angularHomePage.getTodoCheckBoxTextStyle(3)).toBe('done-true');
    // Check that the summary is now changed to 1 of 3 remaining
    expect(angularHomePage.getTodoSummary()).toBe('2 of 4 remaining');
    // Now click archive link
    angularHomePage.clickArchiveLink();
    // Check that the summary is now changed to 2 of 2 remaining
    expect(angularHomePage.getTodoSummary()).toBe('2 of 2 remaining');
  });
});
