/**
 * @author Suvajit Chakraborty
 */
// conf.js
exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
  '../tests/calculator_spec.js',
  '../tests/angular_spec.js'
  ],
  capabilities:{
    'browserName': 'chrome'
  },
  /*capabilities:{
    'browserName': 'MicrosoftEdge'
  },*/
  /*multiCapabilities: [{
    'browserName': 'internet explorer',
     'platform': 'windows',
     'version': 11
     }, {
     'browserName': 'chrome'
     }
  ],*/
  params: {
    calculator: {
      sleepTime: 2000,
      baseUrl: 'http://juliemr.github.io/protractor-demo/'
    },
    angular: {
      sleepTime: 1000,
      baseUrl: 'http://www.angularjs.org',
      greeting: {
        name: 'Suvi'
      }
    }
  },
  onPrepare(){
    browser.driver.manage().window().maximize();
  },
  onComplete(){
  },
}
