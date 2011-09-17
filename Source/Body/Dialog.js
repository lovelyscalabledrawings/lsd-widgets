/*
---
 
script: Dialog.js
 
description: A multipurpose yes/no dialog
 
license: Public domain (http://unlicense.org).

authors: Yaroslaff Fedin
 
requires:
  - LSD.Widget.Body.Page
  - LSD/LSD.Mixin.Fieldset
  - LSD/LSD.Mixin.Submittable
  - LSD/LSD.Mixin.Command
  - LSD/LSD.Mixin.Invokable

provides:
  - LSD.Widget.Body.Dialog

...
*/

LSD.Widget.Body.Dialog = new Class({
  Extends: LSD.Widget.Body.Page,
  
  options: {
    element: {
      tag: 'section'
    },
    classes: Array.object('dialog'),
    pseudos: Array.object('fieldset', 'submittable', 'invokable', 'command', 'focusable'),
    clone: true,
    events: {
      _dialog: {
        element: {
          'click:relay(.cancel)': 'cancel'
        },
        self: {
          build: function() {
            this.hide()
          },
          submit: function() {
            this.hide();
          },
          cancel: 'hide',
          invoke: function() {
            this.show();
          }
        },
        setRole: function() {
          var kind = this.attributes.kind;
          if (!kind) return;
          var template = LSD.Template[kind];
          if (template) {
            this.template = template.clone(this);
            this.template.show();
          }
        }
      }
    },
    has: {
      one: {
        form: {
          selector: 'form',
          as: 'invoker',
          pseudos: Array.object('invokable')
        }
      }
    }
  },
  
  getParentElement: function() {
    return document.body;
  }
});