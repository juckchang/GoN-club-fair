import { getDB } from '../../db/db'
import { verify } from '../../utility/token'

export default async function handler(req, res) {
  const { token } = req.body
  const db = await getDB()

  try {
    const { studentID } = verify(token)
    const users = await db.all('SELECT studentID FROM users WHERE studentID=?', [studentID])
    if (users.length === 1 && users[0].studentID !== undefined) {
      res.status(200).json({ status: true })
    } else {
      res.status(200).json({ status: false })
    }
  } catch (e) {
    res.status(200).json({ status: false })
  }
}
