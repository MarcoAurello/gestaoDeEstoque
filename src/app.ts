import app from './server'

const PORT = process.env.PORT || 4003

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})
