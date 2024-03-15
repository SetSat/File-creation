const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

 
if (!fs.existsSync('./files')) {
    fs.mkdirSync('./files');
}

 
app.get('/create-file', (req, res) => {
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}.txt`;
    const filePath = `./files/${fileName}`;
    
    fs.writeFile(filePath, timestamp.toString(), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to create file');
        } else {
            res.status(201).send('File created successfully');
        }
    });
});

 
app.get('/list-files', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to list files');
        } else {
            res.status(200).send(files);
        }
    });
});

 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
