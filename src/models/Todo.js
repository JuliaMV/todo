import { Model } from 'backbone';

const Todo = Model.extend({
  defaults: {
    title: '',
    completed: false,
  },
  toggle() {
    this.save({
      completed: this.get('completed'),
    });
  },
});

export default Todo;
