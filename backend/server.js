const express = require('express')
const app = express()

app.use('/api/v1/', require('./api'))
 
const PORT = 8081
app.listen(PORT, () => {
  console.log('Server Running...');
  
}) // PORT