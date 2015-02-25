# grunt-versioning

> Loose management of your project's SemVer

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-versioning --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-versioning');
```

## The "versioning" task
Until this plugin has more extensive testing in the wild, please make sure you backup what ever file you are using to manage your version. In my honest opinion, do NOT use your `package.json` or `bower.json` file until thee plugin reaches at least `v0.1.0-beta`. You have been warned!!! Now, go have fun!

You can use the versioning task by setting the type of version bump, a release type, and setting the option `dry` to `false`. By not setting the value of `dry` to false, the plugin will not write to the file you select. This was done intentionally because it is quite easy to accidentally overwrite your `package.json` file. That would not be good! But it would be your fault because you have to intentionally tell the plugin to overwrite your file...

See below for an overly simplified way to use this plugin.

### Overview
In your project's Gruntfile, add a section named `versioning` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  versioning: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.src
Type: `String`
Default value: `package.json`

A string value that is used to set the file that the version information will be taken from. Usually `package.json` or `bower.json`. If you would like to make your own file (say it is named `version.json`), be sure it is valid `json` and contains a key called `version` with a value formatted like the `package.json` or `bower.json` file.

#### options.show
Type: `boolean`
Default value: `true`

A string value that is used to display the version in the console.

#### options.dry
Type: `boolean`
Default value: `true`

A value that decides if the version should be written to the source file. (This option will be removed after more extensive tests have been run on the plugin. Or at `v0.1.0-beta`.)

#### options.releaseType
Type: `String`
Default value: `''`

A string value that is used to set the optionsal release type. If you don't want to change the value or you don't want to have a release type, use

#### options.major
Type: `boolean`
Default value: `false`

A boolean value that is is used to do a major version release.

#### options.minor
Type: `boolean`
Default value: `false`

A boolean value that is is used to do a minor version release.

#### options.patch
Type: `boolean`
Default value: `false`

A boolean value that is is used to do a patch version release.

### Usage Examples
For the best usage exmple I can provide, please the Gruntfile of this project.

Here is a barebones example:

```js
grunt.initConfig({
  versioning: {
    target: {
      options: {}
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
**0.0.1-alpha**  Initial release, suggestion collection,
