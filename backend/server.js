// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// const app = express();
// const port = 3001;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/namesDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Mongoose Model
// const dataSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     }
// });
// dataSchema.plugin(AutoIncrement, { inc_field: 'id' });
// const Data = mongoose.model('Data', dataSchema);

// // Routes
// app.get('/api/data', async (req, res) => {
//     try {
//         const allData = await Data.find();
//         res.json(allData);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch data' });
//     }
// });

// app.post('/api/data', async (req, res) => {
//     try {
//         const { name } = req.body;
//         const newData = new Data({ name });
//         await newData.save();
//         res.json(newData);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to save data' });
//     }
// });

// // Start Server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/namesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Model
const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
dataSchema.plugin(AutoIncrement, { inc_field: 'id' });
const Data = mongoose.model('Data', dataSchema);

// Routes
app.get('/api/data', async (req, res) => {
    const allData = await Data.find();
    res.json(allData);
});

app.post('/api/data', async (req, res) => {
    const { name } = req.body;
    const newData = new Data({ name });
    await newData.save();
    res.json(newData);
});

app.put('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await Data.findOneAndUpdate({ id }, { name }, { new: true });
    res.json(updated);
});

app.delete('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    await Data.findOneAndDelete({ id });
    res.json({ message: 'Deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
