"use strict";
import { PORT } from "@config/env.js";

import app from "./app.js";

const port = (PORT as string) || 3001;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});
