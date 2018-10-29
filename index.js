(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@material-ui/core/Button'), require('@material-ui/core/Avatar')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', '@material-ui/core/Button', '@material-ui/core/Avatar'], factory) :
  (factory((global['@tecsinapse/ui-kit'] = {}),global.React,global.Button,global.Avatar));
}(this, (function (exports,React,Button,Avatar) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  Button = Button && Button.hasOwnProperty('default') ? Button['default'] : Button;
  Avatar = Avatar && Avatar.hasOwnProperty('default') ? Avatar['default'] : Avatar;

  var NewComponent = function NewComponent() {
    return React.createElement("div", null, ' ', React.createElement(Button, null, "OII"), React.createElement("p", null, "OI2!"));
  };

  var NewNewComponent = function NewNewComponent() {
    return React.createElement("div", null, ' ', React.createElement(Avatar, null, "a"), React.createElement("p", null, "NewNewOi"));
  };

  exports.NewComponent = NewComponent;
  exports.NewNewComponent = NewNewComponent;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
