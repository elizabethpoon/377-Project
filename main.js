export default async function handler(req, res) {
  console.log("Received request:", req.method);
  
  if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body);
      console.log("Parsed body:", body);

      if (!body.fact) {
        console.error("Missing fact in body");
        return res.status(400).json({ error: "Missing fact" });
      }

      const { data, error } = await supabase.from('favorites').insert([{ fact: body.fact }]);

      if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error });
      }

      console.log("Successfully saved:", data);
      return res.status(200).json(data);

    } catch (err) {
      console.error("JSON parse error:", err);
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}