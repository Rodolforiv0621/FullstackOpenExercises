const express = require("express");
const app = express();
require('express-async-errors')
const cors = require("cors");
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users');
const loginRouter = require("./controllers/login");



mongoose.set("strictQuery", false);

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl).then(()=>{
  logger.info('connected to MongoDB')
}).catch((error)=>{
  logger.error('error connecting to MongoDB: ', error.message)
})

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});


app.use(cors());
app.use(express.static('dist'))
app.use(express.json());
app.use(middleware.requestLogger)
app.use('/api/login', loginRouter)
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);


app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)

module.exports = app