import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
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
        `UPLOAD_FOLDER=${process.env.UPLOAD_FOLDER}`,
    ].join('\n')
);

const api_router = (await import('./api/api.js')).default;

const app = express();

app.use(cors());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => console.log('mongoose connected'));
mongoose.connection.on('error', (err) => console.log('mongoose error:', err.message));
mongoose.connection.on('disconnected', () => console.log('mongoose disconnected'));

// if a path is specified in args, serve index.html from there
if (process.argv[2]) {
    const indexPath = path.resolve(path.join(process.argv[2], 'index.html'));
    console.log(indexPath);

    app.use(express.static(process.argv[2]));
    app.get('/*', (req, res) => res.sendFile(indexPath));
}

if (process.env.UPLOAD_FOLDER) {
    app.use('/image', express.static(path.resolve(process.env.UPLOAD_FOLDER)));
}

app.use('/api', api_router);

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
