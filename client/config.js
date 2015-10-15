module.exports = {
    "app-one" : {
      'name': 'app-one',
      'consistentPath': 'js/app-one',
      'cssPath': 'css/app-one/**/*.css',
      'cssDest': 'build/css/app-one',
      'cssFileName': 'app.one.min.css',
      'jsPath': 'js/app-one/**/*.js',
      'componentsPath': [
        'js/app-one/components/*.js',
        'js/app-one/components/content/*.js',
        'js/app-one/components/nav/*.js',
      ],
      'storesPath': [
        'js/app-one/stores/*.js',
      ],
      'actonsPath': [
        'js/app-one/actions/*.js',
      ],      
      'jsDest': 'build/js/app-one',
      'jsFileName': 'app.one.min.js',
      'mainJs': 'js/app-one/main'
    },
    "app-two" : {
      'name': 'app-two',
      'consistentPath': 'app-two',
      'cssPath': 'css/app-two/**/*.css',
      'cssDest': 'build/css/app-two',
      'cssFileName': 'app.two.min.css',
      'jsPath': 'js/app-two/**/*.js',
      'componentsPath': 'js/app-two/components/*/*.js',
      'jsDest': 'build/js/app-two',
      'jsFileName': 'app.two.min.js',
      'mainJs': 'js/app-two/main'
    }
}