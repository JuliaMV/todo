import { Collection } from 'backbone';
import Todo from '../models/Todo';

const TodoList = Collection.extend({
  model: Todo,
  // localStorage: new Backbone.LocalStorage('todos-backbone'),
  completed() {
    return this.filter((todo) => todo.get('completed'));
  },
  remaining() {
    return this.without.apply(this, this.completer()); //eslint-disable-line
  },
  nextOrder() {
    if (!this.length) {
      return 1;
    }
    return this.last().get('order') + 1;
  },
  comparator(todo) {
    return todo.get('order');
  },
});

export default TodoList;
