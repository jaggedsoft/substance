'use strict';

var Component = require('../component');
var _ = require('../../basics/helpers');
var $$ = Component.$$;
var ToolComponent = require('./tool_component');

// We disabled editing of a link title for the time being, as it makes for a more mimal interface.

var EditLinkPrompt = Component.extend({

  onSave: function(e) {
    e.preventDefault();
    this.props.tool.updateLink({
      url: this.refs.url.$el.val(),
      // title: this.refs.title.$el.val()
    });
  },

  onDelete: function(e) {
    e.preventDefault();
    this.props.tool.deleteLink();
  },

  render: function() {
    var link = this.props.link;
    var el = $$('div').addClass('prompt shadow border fill-white');

    el.append([
      $$('div').addClass('prompt-title').append('Hyperlink'),
      $$('input').attr({type: 'text', placeholder: 'http://your-website.com', value: link.url})
                 .key('url')
                 .on('change', this.onSave),
      // $$('input').attr({type: 'text', placeholder: 'Optional title', value: link.title})
      //            .key('title')
      //            .on('change', this.onSave),
      $$('a').attr({href: '#'})
             .addClass('delete-link')
             .append('Delete')
             .on('click', this.onDelete)

    ]);
    return el;
  }
});

var LinkToolComponent = ToolComponent.extend({

  render: function() {
    var title = this.props.title;

    if (this.state.mode) {
      title = [_.capitalize(this.state.mode), title].join(' ');
    }

    var el = $$('div')
      .addClass('link');

    if (this.state.disabled) {
      el.addClass('disabled');
    }

    // el.addClass('active');
    if (this.state.mode === 'edit') {
      el.addClass('active');
    }
    if (this.state.mode) {
      el.addClass(this.state.mode);
    }

    var button = $$("button")
      .addClass('button')
      .attr('title', title)
      .on('mousedown', this.onMouseDown)
      .on('click', this.onClick);

    button.append(this.props.children);

    el.append(button);

    // When we are in edit mode showing the edit prompt
    if (this.state.mode === 'edit' && this.state.showPrompt) {
      var link = this.tool.getLink();
      var prompt = $$(EditLinkPrompt, {link: link, tool: this.tool});
      el.append(prompt);
    }

    return el;
  }

});

module.exports = LinkToolComponent;

