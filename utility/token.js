import { jwtKey } from '../secret'
import jwt from 'jsonwebtoken'

const sign = data => jwt.sign(data, jwtKey.secretKey, jwtKey.option)
const verify = token => jwt.verify(token, jwtKey.secretKey)

module.exports = { sign, verify }