import express from 'express'
import { nanoid } from 'nanoid'

const PORT = process.env.PORT
const LINK = process.env.LINK

const app = express()

app.use(express.json())

const links = {}

app.post('/acortar', (req, res) => {
  const { originalLink } = req.body
  const shortId = nanoid(6) // Se puede ajustar la longitud del identificador

  links[shortId] = originalLink

  const shortenedLink = `${LINK}:${PORT}/${shortId}`
  res.json({ shortenedLink })
})

app.get('/:shortId', (req, res) => {
  const { shortId } = req.params
  const originalLink = links[shortId]

  if (originalLink) {
    res.redirect(originalLink)
  } else {
    res.status(404).json({ error: 'Enlace no encontrado' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor iniciado en ${LINK}:${PORT}`)
})
