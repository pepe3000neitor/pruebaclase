import express from 'express' //framework de JS
import mongoose from 'mongoose' //libreria para conectar con mongo

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}))

const app = express()

mongoose.connect('mongodb://isen:dwes@contenedordedockercompose:27017/miapp?authSource=admin')
//indicar a mongoose donde se tiene que conectar...miapp es la base de datos donde vamos a escribir, y auth es el nivel de autorizacion

app.get('/', async (_req, res) => {
  console.log('listando... animales...')
  const animales = await Animal.find(); 
//busca a todos los animales en base de datos y los devuelve
  return res.send(animales)
})
app.get('/crear', async (_req, res) => {
  console.log('creando...')
  await Animal.create({ tipo: 'animal', estado: 'triste' }) 
//crea un animal el cual va a ser tipo ANIMAL y su estado va a ser FELIZ, y luego nos devuelve un OK
  return res.send('ok')
})

app.listen(3000, () => console.log('listening...'))
//dejamos que se quede escuchando en el puerto 3000 y dejamos el consolelog para verificar que está corriendo la aplicacion