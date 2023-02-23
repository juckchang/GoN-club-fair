import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function getDB() {
  const db = await open({
    filename: './db/data.db',
    driver: sqlite3.Database
  })
  return db
}

module.exports = { getDB }