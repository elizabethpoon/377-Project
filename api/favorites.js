import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('favorites').select('*');
    if (error) return res.status(500).json({ error });
    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { fact } = req.body;
    const { data, error } = await supabase.from('favorites').insert([{ fact }]);
    if (error) return res.status(500).json({ error });
    res.status(200).json(data);
  }
}