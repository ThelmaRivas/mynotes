const express = require('express');
const fs = require('fs');
const path = require('path');
const htmlRoutes = require('./routes/html/htmlRoutes');
const apiRoutes = require('./routes/api/apiRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);