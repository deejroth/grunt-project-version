/*
 * grunt-versioning
 * https://github.com/deejroth/grunt-versioning
 *
 * Copyright (c) 2015 DeeJRoth
 * Licensed under the MIT license.
 */


module.exports = function (grunt) {
  'use strict';

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var pkgInfo, versionParts, mmpVersion, releaseType, version;

  function openPackageFile(filepath) {
    if (!grunt.file.exists(filepath)) {
      grunt.log.error('File ' + filepath + ' does not exist!');
    } else {
      return grunt.file.readJSON(filepath);
    }
  }

  /*
   * returns m.m.p in index 0, release type in index 1
   */
  function getVersionParts(semVer) {
    if (semVer.indexOf('-') === -1) {
      return {'version' : semVer, 'releaseType' : undefined};
    } else {
      var split = semVer.split('-');
      return {'version' : split[0], 'releaseType' : split[1]};
    }
  }

  function getVersion(semVer) {
    var chunks = semVer.split('.');

    return {'major' : chunks[0], 'minor' : chunks[1], 'patch' : chunks[2]};
  }

  function bumpLevel(level) {
    level++;
    return level;
  }

  function formatReleaseType(rType) {
    rType = typeof rType !== 'undefined' ? rType : '';

    if (rType !== '') {
      return '-' + rType;
    } else {
      return rType;
    }
  }

  function formatVersion() {
    version = mmpVersion.major + '.' + mmpVersion.minor + '.' + mmpVersion.patch;

    if (releaseType !== '') {
      return version.concat(releaseType);
    } else {
      return version;
    }
  }

  function showVersion() {
    grunt.log.subhead('Project Version Information');

    grunt.log.subhead('Major: ' + mmpVersion.major);
    grunt.log.subhead('Minor: ' + mmpVersion.minor);
    grunt.log.subhead('Patch: ' + mmpVersion.patch);

    if (releaseType !== '') {
      grunt.log.writeln('Release Type: ' + releaseType);
    }

    grunt.log.ok('All done! :-)');
  }

  grunt.registerMultiTask('versioning', 'Loose managing of your project\'s SemVer', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', ',
      major: false,
      minor: false,
      patch: false,
      releaseType: '',
      show: true,
      dry: true,
      src: 'package.json'
    });

    pkgInfo = openPackageFile(options.src);
    versionParts = getVersionParts(pkgInfo.version);
    mmpVersion = getVersion(versionParts.version);
    releaseType = formatReleaseType(versionParts.releaseType);

    if (options.major === true) {
      options.minor = false;
      options.patch = false;

      mmpVersion.major = bumpLevel(mmpVersion.major);
      mmpVersion.minor = 0;
      mmpVersion.patch = 0;
    }

    if (options.minor === true) {
      options.patch = false;

      mmpVersion.minor = bumpLevel(mmpVersion.minor);
      mmpVersion.patch = 0;
    }

    if (options.patch === true) {
      mmpVersion.patch = bumpLevel(mmpVersion.patch);
    }

    // TODO: Allow option to remove release type all together
    if (options.releaseType !== '') {
      releaseType = formatReleaseType(options.releaseType);
    }

    version = formatVersion();

    if (options.show === true) {
      showVersion();
      grunt.log.subhead('Version: ' + version);
    }

    if (options.dry === false) {
      pkgInfo.version = version;
      grunt.file.write(options.src, JSON.stringify(pkgInfo, null, 2));
      return true;
    }
  });
};
