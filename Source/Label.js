/*
---
 
script: Label.js
 
description: A label for a form field
 
license: Public domain (http://unlicense.org).

authors: Yaroslaff Fedin
 
requires:
  - LSD/LSD.Widget

provides: 
  - LSD.Widget.Label
 
...
*/

LSD.Widget.Label = new Class({
  options: {
    tag: 'label',
    has: {
      one: {
        control: {
          selector: ':form-associated',
          collection: 'labels',
          states: {
            get: {
              invalid: 'invalid'
            }
          },
          expectation: function() {
            return {combinator: ' ', tag: '*', pseudos: ['form-associated']}
          }
        }
      }
    },
    expects: {
      '[for]': function(widget, state) {
        widget[state ? 'addRelation' : 'removeRelation']('control', {
          expectation: function() {
            var id = this.attributes['for'];
            return {id: id, combinator: '&&', tag: '*'};
          }
        });
      }
    },
    pseudos: Array.object('clickable', 'command'),
    states: Array.object('invalid')
  }
});