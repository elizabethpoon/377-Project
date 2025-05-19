export default async function handler(req, res) {
  console.log("Request method:", req.method);
  console.log("Incoming body:", req.body);

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  if (req.method === 'POST') {
    const { fact } = req.body;

    if (!fact) {
      return res.status(400).json({ error: "Missing fact in request body" });
    }

    const { data, error } = await supabase.from('favorites').insert([{ fact }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error });
    }

    return res.status(200).json(data);
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('favorites').select('*');
    if (error) {
      console.error("Supabase fetch error:", error);
      return res.status(500).json({ error });
    }

    return res.status(200).json(data);
  }

  res.status(405).json({ error: "Method not allowed" });
}