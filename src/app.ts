import app from './server'

const PORT = process.env.PORT || 4003

process.on('uncaughtException', (err)=>{
  console.log(err)
})

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})
