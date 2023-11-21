const { Router } = require('express');
const router = Router();
const multer = require('multer');
const uploadImage = require('./uploadImage.js')



//bringing title and description of the project to the website
router.get('/proyectos', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const query = `
      SELECT title, description, url FROM proyectos;
    `;

    const result = await pool.query(query);
    console.log(result);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching proyectos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





router.get('/hello', (req, res) => {
  res.status(200).send('Hello PERN project');
});

//route to save customers
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


//route to save the images

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB (adjust the value as needed)
  },
});

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Access the uploaded file from req.file
    const image = req.body.image; // Assuming the image is uploaded as a single file with the key 'image'

    // Now you can use 'image' to upload to Cloudinary or handle it as needed
    const url = await uploadImage(image);

    // Save the URL in the database
    const query = 'INSERT INTO url(url) VALUES ($1) RETURNING *';
    const values = [url];

    try {
      // Use 'await' to wait for the query execution
      const result = await req.app.locals.pool.query(query, values);

      // Send the URL and database result in the response
      res.status(200).json({ url, databaseResult: result.rows[0] });
    } catch (dbError) {
      // Log the database error
      console.error('Error inserting URL into the database:', dbError);

      // Send an error response to the client
      res.status(500).json({ message: 'Error inserting URL into the database' });
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//route to save title and descriptions of each projects

router.post('/saveProject', async (req, res) => {
  const { title, description } = req.body;

  try {
    const query =(
      'INSERT INTO projects (title, description) VALUES ($1, $2) RETURNING *')
      const values = [title, description]
      const result = await req.app.locals.pool.query(query, values);

      res.status(201).json({ message: 'Row inserted successfully', insertedRow: result.rows[0] });
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//route to save the entire project with url images,title and descriptions

router.post('/saveProyecto', async (req, res) => {
  try {
    const { title, description, url } = req.body;

    // Assuming you have a 'proyectos' table with columns 'id', 'title', 'description', 'url', and 'timestamp'
    const query = 'INSERT INTO proyectos (title, description, url) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, description, url];
    console.log(url)

    const result = await req.app.locals.pool.query(query, values);

    res.status(201).json({ message: 'Project information saved successfully', insertedRow: result.rows[0] });
  } catch (error) {
    console.error('Error saving proyecto:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});









module.exports = router;