import { getDB } from '../../../db/db'
import { verify } from '../../../utility/token'
import { stage as allStageInfo } from '../../../secret'

export default async function handler(req, res) {
  const { stage, answer, token } = req.body
  const db = await getDB()

  try {
    const { studentID } = verify(token)
    const users = await db.all('SELECT solved, createdAt FROM users WHERE studentID=?', [studentID])
    if (users.length === 1 && users[0].solved !== undefined) {
      const solved = JSON.parse(users[0].solved)
      const stageInfo = (()=> {
        if (stage === 1) return allStageInfo.stage1
      })(stage)
      console.log(stageInfo)
      const createdAt = users[0].createdAt
      const date = new Date(createdAt)
      date.setMinutes(date.getMinutes() + 20)
      if (stageInfo.answer === answer) {
        if (solved.lastStage === stage && !solved.solves.includes(stage)) {
          solved.lastStage = stage + 1
          solved.score += stageInfo.score
          console.log(createdAt)
          const diffInMs = Math.abs((new Date()).getTime() - date.getTime())

          const diffInMin = Math.floor(diffInMs / 1000 / 60)
          const diffInSec = Math.floor((diffInMs / 1000) % 60)
          console.log(diffInMin)
          console.log(diffInSec)
          solved.remainTime = (diffInMin) * 60 + diffInSec
          solved.solves.push(stage)
          db.run('UPDATE users SET solved=?, updatedAt=datetime("now", "+9 hours") WHERE studentID=?', [JSON.stringify(solved), studentID]).then(r=>{
            res.status(200).json({ status: true, msg: stageInfo.score })
          }).catch(e =>{
            console.log(e)
            res.status(500).json({ status: false, msg: 'error' })
          })
        } else {
          res.status(403).json({ status: false, msg: 'Wrong Stage' })
        }
      } else {
        res.status(403).json({ status: false, msg: 'Wrong answer' })
      }

    } else {
      res.status(403).json({ status: false })
    }
  } catch (e) {
    console.log(e)
    res.status(403).json({ status: false })
  }
}