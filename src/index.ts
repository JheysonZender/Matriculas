import express from 'express'
import cors from 'cors'
import rutas from './rutas/matriculas-rutas'
import "reflect-metadata"
import { AppDataSource } from './data-source'
import bodyParser from 'body-parser'



AppDataSource.initialize()
  .then(()=> {

  })
  .catch((error) => console.log(error))


// variables

const app = express()
const port = 3000

// middleware
app.use(cors())
app.use(express.json())

// rutas
app.use('/sistema', rutas)

app.listen(port, () => {
  console.log(`Matriculas listening on port ${port}`)
})


app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));