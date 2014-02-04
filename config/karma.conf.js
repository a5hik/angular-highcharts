module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'demo/lib/angular/angular.js',
      'demo/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      '../demo/app/**/*.js',
      'demo/common/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      'demo/lib/angular/angular-loader.js',
      'demo/lib/angular/*.min.js',
      'demo/lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
