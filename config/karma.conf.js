module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      '../public/lib/angular/angular.js',
      '../public/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      '../public/app/**/*.js',
      '../public/js/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      'public/lib/angular/angular-loader.js',
      'public/lib/angular/*.min.js',
      'public/lib/angular/angular-scenario.js'
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
