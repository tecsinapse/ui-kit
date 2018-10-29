'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var Button = _interopDefault(require('@material-ui/core/Button'));
var Avatar = _interopDefault(require('@material-ui/core/Avatar'));

var NewComponent = function NewComponent() {
  return React.createElement("div", null, ' ', React.createElement(Button, null, "OII"), React.createElement("p", null, "OI2!"));
};

var NewNewComponent = function NewNewComponent() {
  return React.createElement("div", null, ' ', React.createElement(Avatar, null, "a"), React.createElement("p", null, "NewNewOi"));
};

exports.NewComponent = NewComponent;
exports.NewNewComponent = NewNewComponent;
