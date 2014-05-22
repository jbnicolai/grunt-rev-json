var pth = require('path');
var chalk = require('chalk');
var crypto = require('crypto');
var crc32c = require('fast-crc32c');

var kAlgorithms = {
  crc32c: function(buf) {
    var checksum = crc32c.calculate(buf);
    var buf = new Buffer(4);
    buf.writeUInt32BE(checksum, 0);
    return buf;
  },
  default: function(algorithm) {
    try {
      crypto.createHash(algorithm);
    } catch(e) {
      return null;
    }
    return function(buf) {
      return crypto.createHash(algorithm).update(buf).digest();
    };
  }
};

function toUrlSafeBase64(base64) {
  return base64.replace(/[+\/]/g, function(ch) {
    return ch == '+' ? '-' : '_';
  }).replace(/=+$/, '');
}

function relativePath(from, to) {
  var fromDir = pth.dirname(from);
  var toDir = pth.dirname(to);
  var res = pth.basename(to);
  if (fromDir !== toDir)
    res = pth.relative(fromDir, toDir) + pth.sep + res;
  return res;
}

module.exports = function(grunt) {

grunt.registerMultiTask('rev_json', 'Digest files and outpu as a json file.', function() {

  var options = this.options({
    algorithm: 'crc32c',
    encoding: 'base64',
    urlSafe: true,
    length: 8
  });

  var hasher = options.algorithm;
  if (typeof hasher == 'string')
    hasher = kAlgorithms[hasher] || kAlgorithms.default(hasher);
  if (!hasher)
    return grunt.fail('Cannot find algorithm "' + options.algorithm + '".');

  this.files.forEach(function(file) {
    var versions = {};
    file.src.forEach(function(path) {
      var rev = hasher(grunt.file.read(path)).toString(options.encoding);
      if (options.encoding == 'base64' && options.urlSafe)
        rev = toUrlSafeBase64(rev);
      rev = rev.substr(0, options.length);
      grunt.log.writeln('File ' + chalk.cyan(path) + ' digested (' +
          chalk.cyan(rev) + ').');
      versions[relativePath(file.dest, path)] = rev;
    });
    grunt.file.write(file.dest, JSON.stringify(versions));
    grunt.log.writeln('File ' + chalk.cyan(file.dest) + ' created (rev).')
  });

});

};
