/*
---
 
script: Select.js
 
description: Basic selectbox
 
license: Public domain (http://unlicense.org).

authors: Yaroslaff Fedin
 
requires:
- LSD/LSD.Widget
- LSD.Widget.Button
- LSD/LSD.Trait.Menu
- LSD/LSD.Trait.List
- LSD/LSD.Trait.Item
- LSD/LSD.Trait.Choice
- LSD/LSD.Trait.Value
- LSD/LSD.Mixin.Focus
- LSD/LSD.Trait.Accessibility
- LSD/LSD.Trait.Proxies

provides: [LSD.Widget.Select, LSD.Widget.Select.Button, LSD.Widget.Select.Option]
 
...
*/

LSD.Widget.Select = new Class({
  
  Includes: [
    LSD.Widget,
    LSD.Trait.Menu.Stateful,
    LSD.Trait.List,
    LSD.Trait.Choice,
    LSD.Trait.Value,
    LSD.Trait.Accessibility,
    LSD.Trait.Proxies
  ],
  
  options: {
    tag: 'select',
    events: {
      _select: {
        element: {
          click: 'expand'
        },
        self: {
          set: function(item) {
            this.setValue(item.getValue());
            this.collapse();
          },
          collapse: 'forgetChosenItem'
        }
      },
      _items: {
        element: {
          'mouseover:on(option)': function() {
            if (!this.chosen) this.listWidget.selectItem(this, true)
          },
          'click:on(option)': function(event) {
            if (!this.selected) {
              this.listWidget.selectItem(this);
            } else this.listWidget.collapse();
            if (event) event.preventDefault()
            this.forget()
          }
        }
      }
    },
    shortcuts: {
      'ok': 'selectChosenItem'
    },
    menu: {
      position: 'focus',
      width: 'adapt'
    },
    writable: true,
    has: {
      many: {
        items: {
          selector: 'option',
          layout: 'select-option'
        }
      },
      one: {
        button: {
          selector: 'button',
          layout: 'select-button'
        }
      }
    }
  }
});

LSD.Widget.Select.Button = new Class({
  Extends: LSD.Widget.Button
});

LSD.Widget.Select.Option = new Class({
  Includes: [
    LSD.Widget,
    LSD.Trait.Value,
    LSD.Trait.Item.Stateful
  ],
  
  States: {
    chosen: ['choose', 'forget']
  },
  
  options: {
    tag: 'option'
  },
  
  setContent: function() {
    return (this.value = this.parent.apply(this, arguments));
  }
});