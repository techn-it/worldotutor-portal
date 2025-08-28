"use server"
import { Request, Response } from 'express';
import payload from 'payload';

export default async function handler(req: Request, res: Response) {
  if (req.method === 'GET') {
    const questions = await payload.find({ collection: 'questions', limit: 100, depth: 1 });
    const formatted = questions.docs.map(q => ({
      id: q.id,
      question: q.question,
      category: q.category,
      options: q.options.map(o => ({ text: o.text })),
    }));
    return res.status(200).json(formatted);
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
