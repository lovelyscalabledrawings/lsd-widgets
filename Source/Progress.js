/*
---
 
script: Progress.js
 
description: Progress bar of html5
 
license: Public domain (http://unlicense.org).

authors: Yaroslaff Fedin
 
requires:
  - LSD/LSD.Widget

provides:   
  - LSD.Widget.Progress
 
...
*/

LSD.Widget.Progress = new Class({
  options: {
    tag: 'progress',
    inline: null,
    pseudos: Array.object('value'),
    events: {
      _initial: {
        self: {
          build: function() {
            this.set(this.attributes.value || 0);
          }
        }
      }
    }
  },
  
  getBar: Macro.getter('bar', function() {
    return new Element('span').inject(this.toElement());
  }),
  
  set: function(value) {
    this.setAttribute('value', value);
    this.getBar().setStyle('width', Math.round(value) + '%')
  }
});