/*
This utility function does some magical filesystem operations to import all our files
from a directory so they can be called using a destructured import.
*/

const fs = require('fs');
const path = require('path');

module.exports = (fn) => {
    let imports = {};
    let rp = path.dirname(fn).substr(path.dirname(fn).lastIndexOf('/') + 1);
    fs
      .readdirSync(path.dirname(fn))
      .filter(f => f.indexOf('.') != 0 && f != path.basename(fn) && f.slice(-3) === '.js')
      .forEach(f => {
        imports[f.slice(0, -3)] = require(`../${rp}/${f}`)
      });
    return imports;
}