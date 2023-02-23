// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDB } from '../../db/db'
import { sign } from '../../utility/token'

export default async function handler(req, res) {
  const { studentID, phone } = req.body
  const db = await getDB()
  const initData = {
    lastStage: 1,
    solves: [],
    score: 0,
    remainTime: 1200
  }
  
  if (/[0-9]{8}/.test(studentID) && /010-[0-9]{4}-[0-9]{4}/.test(phone) && studentID.length === 8 && phone.length === 13) {
    db.run('INSERT INTO users VALUES(?, ?, ?, null, datetime("now", "+9 hours"))', [studentID, phone, JSON.stringify(initData)]).then(r => {
      res.status(200).json({ status: true, token: sign({ studentID }) }) 
    }).catch(async e => {
      console.log(e)
      if (e.errno === 19) {
        const users = await db.all('SELECT studentID FROM users WHERE studentID=? and phone=?', [studentID, phone])
        if (users.length === 1 && users[0].studentID !== undefined) {
          res.status(200).json({ status: true, token: sign({ studentID }) }) 
        } else {
          res.status(403).json({ status: false, msg: 'duplicate' })
        }
      }
      else res.status(403).json({ status: false, msg: '' })
    })
  } else {
    res.status(403).json({ status: false, msg: 'validate' })
  }
}
