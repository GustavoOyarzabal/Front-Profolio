import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db()

  if (req.method === 'POST') {
    const { url } = req.body
    try {
      const result = await db.collection('images').insertOne({ url })
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ error: 'Failed to save image URL' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
