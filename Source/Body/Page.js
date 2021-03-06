/*
---
 
script: Body.Page.js
 
description: An in-page independent document (like iphone app page)
 
license: Public domain (http://unlicense.org).

authors: Yaroslaff Fedin
 
requires:  
  - LSD.Widget.Body

provides:
  - LSD.Widget.Body.Page

...
*/

LSD.Widget.Body.Page = new Class({
  Extends: LSD.Widget.Body,
  
  options: {
    element: {
      tag: 'section'
    },
    classes: Array.object('page'),
    nodeType: 1,
    events: {
      _page: {
        'build': function() {
          if (!this.element.parentNode) this.element.inject(document.body);
        }
      }
    }
  }
});