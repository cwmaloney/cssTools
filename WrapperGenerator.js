'use strict';

const fs = require('fs');
const stream = require('stream');
const split2 = require('split2');

class WrapperGenerator extends stream.Transform {

  constructor(options) {
    super({
      readableObjectMode : true,
      writableObjectMode: true
    });
  }

  _transform(inputLine, encoding, callBack) {
    if (inputLine.startsWith('.')) {
      const className = inputLine.substr(1);
      this.push('.ren-' + className + ' { @extend .' + className + '; }\n');
    }
    callBack();
  }
}

const input = fs.createReadStream('bootstrap4ClassList.txt');
const output = fs.createWriteStream('bootstrap4Wrapper.scss');
const lineSplitter = new split2();
const wrapper = new WrapperGenerator();

input.pipe(lineSplitter)
  .pipe(wrapper)
  .pipe(output);

