/*
---
 
script: Button.js
 
description: A button widget. You click it, it fires the event
 
license: Public domain (http://unlicense.org).

authors: Yaroslaff Fedin
 
requires:
  - LSD/LSD.Widget
  - LSD/LSD.Mixin.Touchable

provides: 
  - LSD.Widget.Button
 
...
*/

LSD.Widget.Button = new Class({

  Extends: LSD.Widget,

  options: {
    tag: 'button',
    element: {
      tag: 'span'
    },
    label: '',
    pseudos: Array.fast('touchable')
  },
  
  write: function(content) {
    this.setState('text');
    return this.parent.apply(this, arguments);
  }

});
