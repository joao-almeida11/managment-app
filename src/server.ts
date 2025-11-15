"use strict";
import env from "@config/env";

import app from "./app";

const port = env.PORT || 3001;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});
