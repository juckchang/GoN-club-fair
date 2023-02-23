import { getDB } from '../../../db/db'
import { verify } from '../../../utility/token'

export default async function handler(req, res) {
  const { token } = req.body
  const db = await getDB()

  try {
    const { studentID } = verify(token)
    const users = await db.all('SELECT createdAt FROM users WHERE studentID=?', [studentID])
    if (users.length === 1 && users[0].createdAt !== undefined) {
      const { createdAt } = users[0]
      res.status(200).json({ status: true, createdAt })
    } else {
      res.status(403).json({ status: false })
    }
  } catch (e) {
    console.log(e)
    res.status(403).json({ status: false })
  }
}
