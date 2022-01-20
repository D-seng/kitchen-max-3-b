const resolvers = require('./resolvers')
const User = require('./models/user')
const Post = require('./models/post')
const Kitchen = require('./models/kitchen')
// const Meal = require('./models/meal')
const File = require('./models/file')
const Appointment = require('./models/appointment')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')

const verifyToken = require('./utils/verifyToken')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
// const cldRestController = require('./controllers/cldRestController')
const mongoose = require('mongoose')
const express = require('express')
// const multer = require('multer')
const S3 = require('./s3.js')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

// const { uploadFile } = require('./s3')

require('dotenv').config()

// const corsOptions = {
//   origin: 'http://localhost:8080/',
//   credentials: true
// }

// appCld.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Allow-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
//     return res.status(200).json({})
//   }
//   next()
// })

const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')

dotenv.config({ path: 'variables.env' })

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err))

async function startApolloServer () {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      User,
      Post,
      Kitchen,
      File,
      Appointment
    }
  })
  await server.start()
  const app = express()
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  server.applyMiddleware({ app })

  console.log('aaa')
  await new Promise(resolve => app.listen({ port: 4000 }, () => resolve))
}
startApolloServer()
// console.log('server.graphqlPath ', server.graphqlPath)

// mongodb+srv://<username>:<password>@cluster1-yxsma.mongodb.net/test?retryWrites=true&w=majority
// server.listen().then(({ url }) => {
//   console.log(`Server listening on ${url}`)
// })

// appCld.options('/', cors())

// const appCld = express()
// appCld.use(cors())
// cldRestController(appCld)

// kitchen-king
//* ************* *

const appS3 = express()
appS3.use(cors())
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
//     cb(null, true)
//   } else {
//     cb(null, false)
//   }
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/')
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + file.originalname)
//   }
// })
// const upload = multer({
//   storage,
//   // limits: { fileSize: 1024 * 1024 * 5 },
//   fileFilter: fileFilter
// })
// cldRestController(appCld)
appS3.use(bodyParser.urlencoded({ extended: false }))
appS3.use(bodyParser.json())

appS3.get('/s3UploadUrl', async (req, res) => {
  console.log(req)
  const { uploadUrl, imageName } = await S3.generateUploadUrl()
  res.send({ uploadUrl, imageName })
})

// Refactor later, using params to distinguish between upload and download.
appS3.get('/s3DownloadUrl', async (req, res) => {
  console.log(req.header('image-Name'))
  const downloadUrl = await S3.generateDownloadUrl(req.header('image-Name'))
  res.send(downloadUrl)
})

// appS3.post('/kitchens', upload.single('kitchenImage'), async (req, res, next) => {
//   const file = req.file
//   console.log('file')
//   console.log(file)
//   const result = await S3.uploadFile(file)
//   console.log(result)
//   await unlinkFile(file.path)
//   res.send({ imagePath: `/images/:${result.key}` })
// })

appS3.get('/images/:key', (req, res) => {
  const key = req.params.key
  console.log()
  const readStream = S3.getFileStream(key)
  readStream.pipe(res)
})

// console.log(S3)
appS3.listen({ port: 4001 }, () => {
  console.log('Server listening on 4001')
})

// lsof -nP -iTCP:4000 | grep LISTEN
