const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require("../utils/config");
const User = require('../models/user')

const getTokenFrom = request =>{
  const authorization = request.get("authorization")

  if(authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}
 
const requestLogger = (request, response, next) =>{
    logger.info("Method: ", request.method)
    logger.info("Path: ", request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const unkownEndpoint = (request, response, next) =>{
    response.status(404).send({error: 'unkown endpoint'})
}

const errorHandler = (error, request, response, next) =>{
    logger.error(error.message)

    if (error.name === "CastError") {
      return response.status(400).send({ error: "unkown endpoint" });
    } else if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    } else if (
      error.name === "MongoServerError" &&
      error.message.includes("E11000 duplicate key error")
    ) {
      return response.status(400).json({
        error: "expected `username` to be unique",
      });
    } else if (error.name === "JsonWebTokenError") {
      return response.status(401).json({
        error: "invalid token",
      });
    } else if (error.name === "TokenExpiredError") {
      return response.status(401).json({ error: "token expired" });
    }

    next(error)
}

const tokenExtractor = async (request, response, next) =>{
  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  } 

  request.token = decodedToken; 
  next()
}

const userExtractor = async (request, response, next) =>{
  const user = await User.findById(request.token.id)
  
  if(!user){
    return response.status(400).json({error: "No user"})
  }
  request.user = user
  next()
}

module.exports = {
    requestLogger,
    unkownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}