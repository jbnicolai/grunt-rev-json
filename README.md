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
      // prefix length of encoded digest, pass 0 or -1 to use complete digest
      length: 8
    },
    your_target: {
      src: ['public/**/*.{js,css}']
      dest: 'rev.json'
    },
  },
});
```

### Example

```sh
$ pwd
/Users/xiaoyi/Projects/public
$ tree
.
├── scripts
│   ├── desktop.js
│   ├── error.js
│   └── moment.js
└── styles
    ├── desktop.css
    └── mobile.css
```

```js
grunt.initConfig({
  rev_json: {
    options: {
      algorithm: 'sha224',
      length: -1
    },
    static: {
      src: ['public/**/*.{js,css}'],
      dest: 'public/rev.json'
    }
  }
});
```

```json
{
  "scripts/desktop.js": "eSgRA3v4XUcOM66neA7Y2ZfMOX5w0hNWVfuHpQ",
  "scripts/error.js": "ZQIiKlJ0_Nj0F8-hi1mnYccZ61rJ5n426vgVBw",
  "scripts/mobile.js": "QxB9zfm1PyhYKFMBiqXh9ox8fmCcNmwXWkTRFg",
  "styles/desktop.css": "xjrIkYLwmiL6tTMduEjtziR3cr3bJkxyHZ3wQw",
  "styles/mobile.css": "YcJ2rs1SI7kbcjgnVO8K0Bf1moFVLwmbPHrVaw"
}
```

Output JSON will use src path (relative to output file location) as key, and
digest as value.
