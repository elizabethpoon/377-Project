import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    console.log("Method:", req.method);

    if (!supabase) {
      console.error("Supabase client failed to initialize.");
      return res.status(500).json({ error: "Supabase not initialized" });
    }

    if (req.method === 'GET') {
      const { data, error } = await supabase.from('favorites').select('*');
      if (error) {
        console.error("Supabase GET error:", error);
        return res.status(500).json({ error });
      }
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      let body = {};
      try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      } catch (parseErr) {
        console.error("Invalid JSON:", parseErr);
        return res.status(400).json({ error: "Invalid JSON" });
      }

      const { fact } = body;
      if (!fact) {
        console.error("Missing 'fact' in body:", body);
        return res.status(400).json({ error: "Missing 'fact'" });
      }

      const { data, error } = await supabase.from('favorites').insert([{ fact }]);
      if (error) {
        console.error("Supabase INSERT error:", error);
        return res.status(500).json({ error });
      }

      return res.status(200).json(data);
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (error) {
    console.error("Unhandled API error:", error);
    return res.status(500).json({ error: "Unhandled server error" });
  }
}