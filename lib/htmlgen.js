'use strict';

var _ = require('underscore');

function HTML() {
  this.html = '';
  this.indent = 0;
};

HTML.prototype.append_indent = function() {
  this.html += (Array(this.indent + 1).join('  '));
};

HTML.prototype.append = function(s) {
  if (_.isFunction(s)) {
    s(this);
  } else {
    this.append_indent();
    this.html += s;
    this.html += '\n';
  }
};

HTML.prototype.generic_tag = function(is_complex, tag, value, fields) {
  var tag_opening = '<' + tag;
  if (_.isObject(fields)) {
    for (var i in fields) {
      tag_opening += ' ' + i + '="' + fields[i] + '"';
    }
  }
  if (!is_complex) {
    tag_opening += ' />';
    this.append(tag_opening);
  } else {
    tag_opening += '>';
    var tag_closing = '</' + tag + '>';
    this.append(tag_opening);
    ++this.indent;
    this.append(value);
    --this.indent;
    this.append(tag_closing);
  }
};

HTML.prototype.tag = function(tag, value, fields) {
  this.generic_tag(true, tag, value, fields);
};

HTML.prototype.single_tag = function(tag, fields) {
  this.generic_tag(false, tag, null, fields);
};

// Ex. "<table> ... </table>".
function generic(tag) {
  HTML.prototype[tag] = function(xs) {
    this.tag.apply(this, _.flatten([tag, Array(arguments)]));
  }
};

// Ex. "<br">.
function single(tag) {
  HTML.prototype[tag] = function() {
    this.append('<' + tag + '>');
  };
};

// Ex. "<input ... />".
function single_with_fields(tag) {
  HTML.prototype[tag] = function() {
    this.single_tag.apply(this, _.flatten([tag, Array(arguments)]));
  };
};

var html_tags = {
  table: generic,
  a: generic,
  ul: generic,
  li: generic,
  tr: generic,
  td: generic,
  b: generic,
  h1: generic,
  h2: generic,
  h3: generic,
  form: generic,
  font: generic,
  p: generic,
  br: single,
  input: single_with_fields,
};
for (var tag in html_tags) {
  html_tags[tag](tag);
}

module.exports = HTML;
