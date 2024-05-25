import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()

  switch (req.method) {
    case 'GET': {
      const forms = await db.collection('form').find({}).toArray()
      console.log(db.forms)
      res.json(forms)
      break
    }

    case 'POST': {
      const newForm = req.body
      await db.collection('form').insertOne(newForm)
      res.status(201).json(newForm)
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
