import express from 'express';
import path from 'path';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const port = parseInt(process.env.PORT);
console.log(`NODE_ENV = ${process.env.NODE_ENV} Port = ${port}`);

const app = express();

app.use(cors());
app.use(express.json());

if (process.argv[2]) {
    const indexPath = path.resolve(path.join(process.argv[2], 'index.html'));
    console.log(indexPath);

    app.use(express.static(process.argv[2]));
    app.get('/*', (req, res) => res.sendFile(indexPath));
}

app.listen(port, () => console.log(`Server listening at localhost:${port}`));
