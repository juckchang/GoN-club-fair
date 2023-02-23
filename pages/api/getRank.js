import { getDB } from '../../db/db'
import { verify } from '../../utility/token'

export default async function handler(req, res) {
  const { token } = req.body
  const db = await getDB()

  const studentID = await (async () => {
    try {
      const { studentID } = verify(token)
      const users = await db.all('SELECT studentID FROM users WHERE studentID=?', [studentID])
      if (users.length === 1 && users[0].studentID !== undefined) {
        return studentID
      } else {
        return ''
      }
    } catch (e) {
      console.log(e)
      return ''
    }
  })()

  const rank = await db.all('SELECT studentID, solved, updatedAt FROM users')

  rank.sort((a, b) => {
    const aSolved = JSON.parse(a.solved)
    const bSolved = JSON.parse(b.solved)

    if (a.studentID === studentID) a.user = 1
    else a.user = 0

    if (b.studentID === studentID) b.user = 1
    else b.user = 0


    if (aSolved.score > bSolved.score) {
      return -1
    } else if (aSolved.score < bSolved.score) {
      return 1
    } else {
      if (aSolved.remainTime > bSolved.remainTime) {
        return -1
      } else {
        return 1
      }
    }
  })
  let cnt = 1
  for (const r of rank) {
    r.rank = cnt
    cnt += 1
  }

  res.status(200).json({ status: true, msg: rank })
}
