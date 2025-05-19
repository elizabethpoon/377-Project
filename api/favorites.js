import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('favorites').select('*');
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    try {
      const { fact } = req.body;
      const { data, error } = await supabase.from('favorites').insert([{ fact }]);
      if (error) return res.status(500).json({ error });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}