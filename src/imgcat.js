var system = require('system');
var env = system.env;

var ESC = '\x1B';
var END = '\x07\n';

function print_osc() {
  if (env['TERM'].indexOf('screen') > -1) {
    return ESC + 'Ptmux;' + ESC + ESC + ']';
  } else {
    return ESC + ']';
  }
}

function print_st() {
  if (env['TERM'].indexOf('screen') > -1) {
    return END + ESC + '\\';
  } else {
    return END;
  }
}

function imgcat(base64Content) {
  var s = print_osc();
  s += '1337;File=inline=1:';
  s += base64Content;
  s += print_st();

  return s;
}

module.exports = imgcat;
