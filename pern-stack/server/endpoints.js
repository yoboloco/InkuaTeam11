const { Router } = require('express');
const router = Router();



router.get('/hello', (req, res) => {
  res.status(200).send('Hello PERN project');
});

router.post('/insertRow', async (req, res) => {
  try {
    const { name, phoneNumber, email } = req.body;

    // Insert the data into the PostgreSQL table
    const query = 'INSERT INTO my_table(name, cellphone_number, email) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, phoneNumber, email];

    const result = await req.app.locals.pool.query(query, values);

    res.status(201).json({ message: 'Row inserted successfully', insertedRow: result.rows[0] });
  } catch (error) {
    console.error('Error inserting row:', error);
    res.status(500).json({ message: 'Error inserting row' });
  }
});


//enpoint to receive long text from newproject box

// Add a new route to handle long text data
router.post('/insertText', async (req, res) => {
  try {
    const { longText } = req.body;

    if (!longText) {
      return res.status(400).json({ message: 'Long text is required' });
    }

    // Insert the long text data into the PostgreSQL table
    const query = 'INSERT INTO TextData(description) VALUES ($1) RETURNING *';
    const values = [longText];

    const result = await req.app.locals.pool.query(query, values);

    if (result.rowCount === 1) {
      res.status(201).json({ message: 'Long text inserted successfully', insertedRow: result.rows[0] });
    } else {
      res.status(500).json({ message: 'Failed to insert long text' });
    }
  } catch (error) {
    console.error('Error inserting long text:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router;