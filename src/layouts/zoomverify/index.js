import React, { Component } from "react";

var __html = require('./verifyzoom.html.js');
var template = { __html: __html };

class Verify extends Component {
  render() {
    return (
      <span dangerouslySetInnerHTML={template}></span>
    );
  }
}
export default Verify;