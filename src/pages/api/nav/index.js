import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()

  switch (req.method) {
    case 'GET': {
      const navs = await db.collection('nav').find({}).toArray()
      console.log(db.navs)
      res.json(navs)
      break
    }

    case 'POST': {
      const newNav = req.body
      await db.collection('nav').insertOne(newNav)
      res.status(201).json(newNav)
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
