/*
---
 
script: Checkbox.js
 
description: Boolean checkbox type of input
 
license: Public domain (http://unlicense.org).

authors: Yaroslaff Fedin
 
requires:
  - LSD.Widget.Input
  - LSD/LSD.Mixin.Touchable
  - LSD/LSD.Mixin.Focusable
  - LSD/LSD.Mixin.Command

provides: 
  - LSD.Widget.Input.Checkbox
 
...
*/
LSD.Widget.Input.Checkbox = new Class({
  options: {
    tag: 'input',
    pseudos: Array.object('clickable', 'focusable', 'checkbox', 'value', 'form-associated'),
    shortcuts: {
      space: 'toggle'
    }
  }
});