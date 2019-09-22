import { View } from 'backbone';
import $ from 'jquery';

import TodoView from './TodoView';
import TodoList from '../collections/TodoList';
import statsTemlate from '../templates/stats.template.html';

// const ENTER_KEY = 13;
const Todos = new TodoList();

const AppView = View.extend({
  el: '#todoapp',
  statsTemplate: statsTemlate,
  // statsTemplate: _.template(statsTemlate.html()),
  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #clear-completed': 'clearCompleted',
    'click #toggle-all': 'toggleAllComplete',
  },
  initialize() {
    this.allCheckbox = this.$('#toggle-all');
    this.$input = this.$('#new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');
    this.listenTo(Todos, 'add', this.addOne);
    this.listenTo(Todos, 'reset', this.addAll);
    this.listenTo(Todos, 'changle:completed', this.filterOne);
    this.listenTo(Todos, 'filter', this.filterAll);
    this.listenTo(Todos, 'all', this.render);
    // Todos.fetch();
  },
  render() {
    const completed = Todos.completed().length;
    const remaining = Todos.remaining().length;
    if (Todos.length) {
      this.$main.show();
      this.$footer.show();
      this.$footer.html(this.statsTemlate({
        completed, remaining,
      }));
      this.$('$filters li a')
        .removeClass('selected')
        .filter(`[href="/${TodoFilter || ''}"]`)
        .addClass('selected');
    } else {
      this.$main.hide();
      this.$footer.hide();
    }
    this.allCheckbox.checked = !remaining;
  },
  addOne(todo) {
    const view = new TodoView({ model: todo });
    $('#todo-list').append(view.render().el);
  },
  addAll() {
    this.$('#todo-list').html('');
    Todos.each(this.addOne, this);
  },
  filterOne(todo) {
    todo.trigger('visible');
  },
  filterAll() {
    Todos.each(this.filterOne, this);
  },
  newAttributes() {
    return {
      title: this.$input.val().trim(),
      order: Todos.nextOrder(),
      completed: false,
    };
  },
  createOnEnter(event) {
    // if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
    //   return;
    // }
    if (event.key !== 'Enter' || !this.$input.val().trim()) {
      return;
    }
    Todos.create(this.newAttributes());
    this.$input.val('');
  },
  clearCompleted() {
    // _.invoke(Todos.completed(), 'destoy');
    // return false;
  },
  toggleAllcomplete() {
    const completed = this.allCheckbox.checked;
    Todos.each((todo) => {
      todo.save({
        completed,
      });
    });
  },
});

export default AppView;
