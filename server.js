const express = require("express");
const ctrl = require("./controller.js");

const app = express();
const port = process.env.PORT || 9001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//get
app.get("/get_user_list", ctrl.retrieveUsers);

app.listen(port, () => console.log(`Listening on port ${port}`));
