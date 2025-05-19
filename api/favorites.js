import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('favorites').select('*');
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    let body = {};

    try {
      body = JSON.parse(req.body);
    } catch (err) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    const { fact } = body;

    if (!fact) {
      return res.status(400).json({ error: "Missing 'fact' in request body" });
    }

    const { data, error } = await supabase.from('favorites').insert([{ fact }]);
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}