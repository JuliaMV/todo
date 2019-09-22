import { View } from 'backbone';

import todoTemplate from '../templates/item.template.html';

const TodoView = View.extend({
  tagName: 'li',
  template: todoTemplate,
  events: {
    'dbclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close',
  },
  initialize() {
    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$input = this.$('.edit');
    return this;
  },
  edit() {
    this.$el.addClass('edititing');
    this.$input.focus();
  },
  close() {
    const value = this.$input.val().trim();
    if (value) {
      this.model.save({
        title: value,
      });
    }
    this.$el.removeClass('edititing');
  },
  updateOnEnter(event) {
    // if (event.witch === ENTER_KEY) {
    //   this.close();
    // }
    if (event.key !== 'Enter') {
      this.close();
    }
  },
});

export default TodoView;
