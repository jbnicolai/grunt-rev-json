# grunt-rev-json [![NPM version](https://badge.fury.io/js/grunt-rev-json.png)](http://badge.fury.io/js/grunt-rev-json) [![Dependencies](https://david-dm.org/ashi009/grunt-rev-json.png)](https://david-dm.org/ashi009/grunt-rev-json)

Digest files and output rev for each file in a json.

## Getting Started

```shell
npm install grunt-rev-json --save
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-rev-json');
```

## The "rev_json" task

### Overview
In your project's Gruntfile, add a section named `rev_json` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  rev_json: {
    options: {
      // algorithm used to digest
      // crc32c and all crypto.createHash supported algorithms
      algorithm: 'crc32c'
      // encoding of digest
      // base64, hex
      encoding: 'base64',
      // use url safe base64, only works when encoding is base64
      urlSafe: true,
      // prefix length of encoded digest
      length: 8
    },
    your_target: {
      src: ['public/**/*.{js,css}']
      dest: 'rev.json'
    },
  },
});
```
