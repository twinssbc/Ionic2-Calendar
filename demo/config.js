/**
 * PLUNKER VERSION (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 * Override at the last minute with global.filterSystemConfig (as plunkers do)
 */
(function (global) {
    var ngVer = '@2.0.0-rc.3'; // lock in the angular package version; do not let it float to current!

    //map tells the System loader where to look for things
    var map = {
        'app': 'src', // 'dist',
        'rxjs': 'https://npmcdn.com/rxjs@5.0.0-beta.6',
        'angular2-in-memory-web-api': 'https://npmcdn.com/angular2-in-memory-web-api', // get latest
        'ionic2-calendar': '../src'
    };

    //packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {main: 'app.ts', defaultExtension: 'ts'},
        'rxjs': {defaultExtension: 'js'},
        'angular2-in-memory-web-api': {defaultExtension: 'js'},
        'ionic2-calendar': {main: '../../src/index.ts', defaultExtension: 'ts'},
        'ionic-angular': {main: 'index.js'}
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/router',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade'
    ];

    // add map entries for angular packages in the form '@angular/common': 'https://npmcdn.com/@angular/common@0.0.0-3'
    packageNames.forEach(function (pkgName) {
        map[pkgName] = 'https://npmcdn.com/' + pkgName + ngVer;
    });

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
    });

    var config = {
        transpiler: 'typescript',
        typescriptOptions: {
            emitDecoratorMetadata: true
        },
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);
})(this);


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */