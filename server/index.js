import express from 'express'

const PORT = 5000;

const app = express()
app.get('/', (req, res) => {
  res.status(200).json('Мама я бэкендер')
})
app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
