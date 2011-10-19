/*
---
 
script: Calendar.js
 
description: A nice simple calendar table
 
license: Public domain (http://unlicense.org).

authors: Yaroslaff Fedin
 
requires:
  - LSD.Widget.Table

provides: 
  - LSD.Widget.Table.Calendar
 
...
*/

LSD.Widget.Table.Calendar = new Class({
  Extends: LSD.Widget.Table,
  
  options: {
    format: {
      caption: "%B %Y"
    },
    classes: Array.object('calendar'),
    pseudos: Array.object('date'),
    events: {
      _calendar: {
        self: {
          'attach': function() {
            this.setDate(this.getDefaultDate());
          },
          setTable: function() {
            if (this.date && !this.selected) this.setDay(this.date);
          }
        },
        element: {
          'touchstart:relay(td:not(.empty))': 'touchDate',
          'touchend': 'untouchDate',
          'touchcancel': 'untouchDate',
          'touchstart:relay(td)': 'selectDate'
        }
      }
    }
  },
  
  selectDate: function(e) {
    var cell = this.getCellByEvent(e);
    var date = this.date ? this.date.clone() : new Date;
    var day = this.getDayFromCell(cell);
    this.setDate(date.set('date', day));
  },
  
  getDefaultDate: function() {
    return new Date
  },
  
  touchDate: function(e) {
    var cell = this.getCellByEvent(e);
    cell.className += " touched"
    this.touched = cell;
  },
  
  untouchDate: function(e) {
    if (!this.touched) return;
    this.touched.className = this.touched.className.replace(/\s*touched\s*/, ' ');
    delete this.touched;
  },
  
  getDayFromCell: function(cell) {
    return parseInt(Element.get(cell, 'text'));
  },
  
  getDayFromRow: function(row) {
    var items = row.getElementsByTagName('td');
    var i = this.getDayFromCell(items[0]);
    if (i > 20 && this.day < 20) {
      var j = this.getDayFromCell(items[items.length - 1]);
      if (j < 20) {
        return j - 6;
      }
    } 
    return i;
  },
  
  getCellByDay: function(day) {
    var index = day + this.firstDay.get('day') - 1 - (Locale.get('Date.firstDayOfWeek') || 0);
    var row = this.rows[Math.floor(index / 7)];
    var weekday = index % 7;
    for (var i = 0, j = 0, node, nodes = row.childNodes; node = nodes[i++];)
      if (LSD.toLowerCase(node.tagName) == 'td')
        if (j++ == weekday) return node;
  },
  
  getCellByEvent: function(event) {
    var target = event.target;
    if (LSD.toLowerCase(target.tagName) != 'td') target = Slick.find(event.target, '! td');
    return target;
  },
  
  setRow: function(row) {
    if (row.localName) {
      var day = this.getDayFromRow(row);
    } else {
      var day = parseInt(row[0]);
      var row = LSD.Widget.Table.prototype.setRow.apply(this, arguments);
    }
    if ((day <= this.day) && (day + 7 > this.day)) {
      row.className = 'selected';
    } else if (day > this.day) {
      row.className = 'future';
    } else {
      row.className = 'past';
    }
    return row;
  },
  
  setCell: function(cell, i, j) {
    if (cell.localName) {
      var number = this.getDayFromCell(cell);
    } else {
      var number = cell;
      cell = LSD.Widget.Table.prototype.setCell.apply(this, arguments);
    }
    if (j == 0 && number > 7) var prefix = true;
    else if (j == this.rows.length - 1 && number < 7) var suffix = true;
    if (number == ' ') {
      cell.className = 'empty';
    } else if (number == this.day && !prefix && !suffix) {
      cell.className = 'selected';
      this.selected = cell;
    } else if (number > this.day || suffix) {
      cell.className = 'future';
    } else {
      cell.className = 'past';
    }
    
    if (!this.today) this.today = new Date;
    if (number == this.today.get('date') && this.today.get('month') == this.date.get('month')) {
      cell.className += ' today';
    }
    return cell;
  },
  
  setDay: function(date) {
    var day = date.getDate();
    var first = date.clone().set('date', 1);
    var monthSet = !this.firstDay || this.firstDay.compare(first);
    this.firstDay = first;
    if (monthSet) this.setMonth(first);
    if (monthSet || day != this.day) {
      this.day = day;
      if (this.table) {
        var cell = this.getCellByDay(this.day);
        if (this.selected) {
          this.setCell(this.selected);
          this.setRow(this.selected.parentNode);
        }
        this.selected = cell;
        this.setCell(this.selected);
        this.setRow(this.selected.parentNode);
        this.fireEvent('setDay', [day, cell]);
      }
    }
  },
  
  setDate: function(date) {
    if (!date) date = new Date;
    if (this.date && !this.date.compare(date)) return false;
    this.date = date;
    this.fireEvent('set', date);
    this.setDay(date);
  },
  
  setMonth: function(date) {
    delete this.selected;
    var table = {
      caption: date.format(this.options.format.caption),
      data: [[]],
      header: Locale.get('Date.days_abbr').map(function(d) { return d.replace('.', '')})
    };
    var first = Locale.get('Date.firstDayOfWeek');
    if (first) {
      table.header.push.call(table.header, table.header.splice(0, first))
    }
    var data = table.data;
    if (this.options.footer !== false) table.footer = table.header;
    var day = date.get('day') - first;
    var last = date.getLastDayOfMonth();
    for (var i = 0; i < day; i++) data[0].push(date.clone().increment('day', - day + i).get('date'));
    for (var i = 1; i <= last; i++) {
      var index = Math.floor((i + day - 1) / 7);
      var row = data[index];
      if (!row) row = data[index] = [];
      row.push(i);
    }
    if (row.length < 7)
      for (var i = 0, j = data.length - 1, k = (7 - ((last + day) % 7)); i < k; i++) 
        data[j].push(date.clone().increment('day', last + i).get('date'));
        
    if (this.built && this.table) this.setTable(table);
    else Object.merge(this.options, table);
  }
});