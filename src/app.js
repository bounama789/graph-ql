import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { login } from './handlers/login.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.post('/signin', login)


app.listen(port, () => {
    console.log(`app listening on port,${port}\n\thttp://localhost:${port}`);
})