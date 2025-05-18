const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// GET endpoint: fetch saved facts
app.get('/api/favorites', async (req, res) => {
  const { data, error } = await supabase.from('favorites').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST endpoint: save new fact
app.post('/api/favorites', async (req, res) => {
  const { fact } = req.body;
  const { data, error } = await supabase.from('favorites').insert([{ fact }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
