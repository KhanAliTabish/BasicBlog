const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  console.log(commentsByPostId)
  res.send(commentsByPostId[req.params.id] || [])
})


app.post('/posts/:id/comments', (req, res) => {
  const cid = randomBytes(4).toString('hex')
  const { content } = req.body

  const comments = commentsByPostId[req.params.id] || []
  comments.push({ id:cid, content })
  commentsByPostId[req.params.id] = comments

  res.status(201).send(comments)
})
















app.listen(3001, () => {
  console.log('Post magic at 3001')
})