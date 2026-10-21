const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const redis = require('../redis')

/* GET added todos count. */
router.get('/', async (_, res) => {
  const todoCount = (await redis.get('added_todos')) || 0
  if (todoCount === 0) {
    await redis.set('added_todos', 0)
  }
  res.send({ added_todos: todoCount })
})

module.exports = router
