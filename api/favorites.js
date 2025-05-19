import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('favorites').select('*');
      if (error) return res.status(500).json({ error });
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { fact } = body;
      if (!fact) return res.status(400).json({ error: 'Missing fact' });

      const { data, error } = await supabase.from('favorites').insert([{ fact }]);
      if (error) return res.status(500).json({ error });
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { id } = body;
      if (!id) return res.status(400).json({ error: 'Missing id' });

      const { error } = await supabase.from('favorites').delete().eq('id', id);
      if (error) return res.status(500).json({ error });
      return res.status(200).json({ message: 'Deleted successfully' });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: 'Server error' });
  }
}