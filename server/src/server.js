import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

// set env variables (PORT, MONGO_URI, ...) from file
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
console.log(
    [
        `NODE_ENV=${process.env.NODE_ENV}`,
        `PORT=${process.env.PORT}`,
        `MONGO_URI=${process.env.MONGO_URI}`,
        `TOKEN_KEY=${process.env.TOKEN_KEY}`,
    ].join('\n')
);

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('error', err => console.log(err));

// if a path is specified in args, serve index.html from there
if (process.argv[2]) {
    const indexPath = path.resolve(path.join(process.argv[2], 'index.html'));
    console.log(indexPath);

    app.use(express.static(process.argv[2]));
    app.get('/*', (req, res) => res.sendFile(indexPath));
}

const port = parseInt(process.env.PORT);
const server = app.listen(port, () =>
    console.log(`Server listening at localhost:${port}`)
);

// Close server and db on exit
['SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'].forEach((signal) =>
    process.on(signal, async () => {
        console.log(`Recieved ${signal}`);
        console.log('Closing express server');
        server.close();
        console.log('Closing mongodb client');
        await mongoose.disconnect();
        process.exit();
    })
);
