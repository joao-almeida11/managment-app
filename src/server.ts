// Setup a minimal Express app with a health route (GET /health → { status: 'ok' })
'use strict';
import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

const port = process.env.PORT;

app.listen(port, err => {
    if (err) {
        console.log(err);
        return process.exit(1);
    }
    console.log(`Server is running on ${port}`);
});

export default app;
