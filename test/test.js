'use strict';

var assert = require('assert');
var HTML = require('../lib/htmlgen.js');

describe('Smoke test: ', function() {
  it('generates HTML', function(done) {
    var html = new HTML();
    html.h1('Header');
    html.append('Sample text');
    html.br();
    html.table(function() {
      html.tr(function() {
        html.td('Test passed', { colspan: 2 });
      });
      html.tr(function() {
        html.td(function() {
          html.a('Google', { href: 'http://google.com' });
        });
        html.td(function() {
          html.input({ type: 'text', name: 'test', value: 'OK' });
        });
      });
    }, {
      border: 1
    });
    var golden = 
      '<h1>\n' +
      '  Header\n' +
      '</h1>\n' +
      'Sample text\n' +
      '<br>\n' +
      '<table border="1">\n' +
      '  <tr>\n' +
      '    <td colspan="2">\n' +
      '      Test passed\n' +
      '    </td>\n' +
      '  </tr>\n' +
      '  <tr>\n' +
      '    <td>\n' +
      '      <a href="http://google.com">\n' +
      '        Google\n' +
      '      </a>\n' +
      '    </td>\n' +
      '    <td>\n' +
      '      <input type="text" name="test" value="OK" />\n' +
      '    </td>\n' +
      '  </tr>\n' +
      '</table>\n';
    assert.equal(html.html, golden);
    done();
  });
});
