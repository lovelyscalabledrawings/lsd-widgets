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
    events: {
      _dialog: {
        hide: function() {
          if (this.invoker) this.revoke(true);
        },
        revoke: function() {
          if (this.invokation) this.invokation.enable()
          delete this.invokation;
        },
        invoke: function() {
          this.invokation = this.invoker;
          if (this.invoker) this.invoker.disable()
        },
        element: {
          'click:relay(.cancel)': 'cancel'
        },
        setRole: function() {
          var kind = this.attributes.kind;
          if (!kind) return;
          var template = LSD.Template[kind];
          if (template) {
            this.template = template.clone(this);
            this.template.attach();
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