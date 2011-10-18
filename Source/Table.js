/*
---
 
script: Table.js
 
description: All-purpose table class
 
license: Public domain (http://unlicense.org).

authors: Yaroslaff Fedin
 
requires:
  - LSD/LSD.Widget

provides: 
  - LSD.Widget.Table
 
...
*/

LSD.Widget.Table = new Class({
  options: {
    header: null,
    footer: null,
    caption: null,
    actions: {
      table: {
        enable: function() {
          var el = this.element;
          this.head = el.tHead;
          this.body = (el.tBodies ? el.tBodies[0] : el.tBody);
          this.foot = el.tFoot;
          this.setTable(this.options);
        }
      }
    },
    tag: 'table'
  },
  
  setTable: function(table) {
    if (table != this.options) this.setOptions(table);
    if (table.caption) this.setCaption(table.caption);
    if (table.header) this.setHeader(table.header);
    if (table.data) this.setData(table.data);
    if (table.footer) this.setFooter(table.footer);
    this.fireEvent('setTable', [this, table])
    this.table = true;
  },
  
  setData: function(data) {
    if (!this.body) this.body = new Element('tbody').inject(this.element);
    else this.body.empty()
    this.rows = [];
    for (var i = 0, row; row = data[i]; i++) {
      row = this.setRow(row, i)
      this.rows.push(row);
      this.body.appendChild(row);
    }
  },
  
  setRow: function(values, index) {
    var element = document.createElement('tr');
    for (var i = 0, value; value = values[i]; i++) 
      element.appendChild(this.setCell(value, i, index));
    return element;
  },
  
  setCell: function(value, cell, row) {
    return this.setCellContent(document.createElement('td'), value, cell, row);
  },
  
  setCellContent: function(element, value) {
    element.innerHTML = value;
    return element;
  },
  
  setHeaderCell: function(value) {
    return this.setHeaderCellContent(document.createElement('th'), value);
  },
  
  setHeaderCellContent: function(element, value) {
    element.innerHTML = value;
    return element;
  },
  
  setCaption: function(value) {
    if (!this.caption) this.caption = new Element('caption').inject(this.element);
    return this.setCaptionContent(this.caption, value);
  },
  
  setCaptionContent: function(element, value) {
    element.innerHTML = value;
    return element;
  },
  
  setHeader: function(header) {
    if (!this.head) {
      this.head = new Element('thead').inject(this.element);
      this.headRow = new Element('tr').inject(this.head);
    } else this.headRow.empty();
    
    header.each(function(name) {
      this.headRow.appendChild(this.setHeaderCell(name))
    }, this);
    return this.head;
  },
  
  setFooter: function(footer) {
    if (!this.foot) {
      this.foot = new Element('tfoot').inject(this.element);
      this.footRow = new Element('tr').inject(this.foot);
    } else this.footRow.empty()
    footer.each(function(name) {
      this.footRow.appendChild(this.setHeaderCell(name))
    }, this);
    return this.foot;
  }
});