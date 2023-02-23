import { getDB } from '../../../db/db'
import { verify } from '../../../utility/token'

export default async function handler(req, res) {
  const { token } = req.body
  const db = await getDB()

  try {
    const { studentID } = verify(token)
    const users = await db.all('SELECT solved FROM users WHERE studentID=?', [studentID])
    if (users.length === 1 && users[0].solved !== undefined) {
      const stage = JSON.parse(users[0].solved).lastStage
      res.status(200).json({ status: true, stage })
    } else {
      res.status(403).json({ status: false })
    }
  } catch (e) {
    console.log(e)
    res.status(403).json({ status: false })
  }
}
