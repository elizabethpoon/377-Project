import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('favorites').select('fact');
      if (error) {
        console.error('Supabase GET error:', error);
        return res.status(500).json({ error: 'Error fetching facts from Supabase' });
      }
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      let body = {};
      try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      } catch (err) {
        return res.status(400).json({ error: 'Invalid JSON in request body' });
      }

      const { fact } = body;
      if (!fact) {
        return res.status(400).json({ error: 'Missing "fact" in request body' });
      }

      const { data, error } = await supabase.from('favorites').insert([{ fact }]);
      if (error) {
        console.error('Supabase INSERT error:', error);
        return res.status(500).json({ error: 'Error saving fact' });
      }

      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });

  } catch (err) {
    console.error('Unhandled error:', err);
    return res.status(500).json({ error: 'Server crashed unexpectedly' });
  }
}