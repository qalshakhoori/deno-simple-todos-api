import { Router } from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

interface Todo {
  id: number;
  text: string;
}

let todos: Todo[] = [];

router.get('/todos', (ctx) => {
  ctx.response.body = { todos: todos };
});

router.post('/todos', async (ctx) => {
  const result = ctx.request.body({ type: 'json' });
  const data = (await result.value) as Todo;
  const newTodo: Todo = { id: todos.length + 1, text: data.text };

  todos.push(newTodo);

  ctx.response.body = { todo: newTodo };
});

router.put('/todos/:id', async (ctx) => {
  const result = ctx.request.body({ type: 'json' });
  const data = (await result.value) as Todo;
  const id = ctx.params.id;
  const todoIndex = todos.findIndex(
    (todo) => todo.id.toString() === id?.toString()
  );
  todos[todoIndex] = { id: todos[todoIndex].id, text: data.text };
  ctx.response.body = { todo: todos[todoIndex] };
});

router.delete('/todos/:id', (ctx) => {
  const id = ctx.params.id;
  todos = todos.filter((todo) => todo.id.toString() !== id?.toString());
  ctx.response.body = { message: 'Deleted todo' };
});

export default router;
