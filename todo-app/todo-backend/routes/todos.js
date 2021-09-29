const express = require('express');
const { Todo } = require('../mongo')
const redis = require('../redis')
const router = express.Router();

router.get('/statistics', async (_, res) => {
  redis.getAsync('addCount').then(result => {
    let count = 0
    if (result) count = Number(result)
    res.send({
      "added_todos": count
    })
  })
})

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  let count = 0
  redis.getAsync('addCount').then(result => {
    if (result) count = Number(result)
    redis.setAsync('addCount', count + 1)
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  await res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body
  const todo = await Todo.findById(req.todo.id)
  text ? todo.text = text : null
  done ? todo.done = done : null
  todo.save()
  res.send(todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
