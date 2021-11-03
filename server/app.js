/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express"),
    app = express();
const morgan = require("morgan");
const cors = require('cors')
// Db
require("./db");

// Call routing level middleware
const apiRoute = require("./routes/api.routing.js");

// Load third-party middleware
app.use(morgan("dev"));

app.use(cors()) //accept every incoming request

// Inbuilt middleware for parsing incoming data
app.use(express.urlencoded({
    // eslint-disable-next-line quote-props
    extended: true
}));
app.use(express.json()); // (for json)

// Load routing level middleware
app.use(
    "/api",
    apiRoute
);

app.use((req, res, next) => {

    // For undefined request
    next({
        "msg": "NOT FOUND 404",
        "status": 404
    });

});
// Error handling middleware
app.use((err, req, res) => {

    console.log(
        "Error is >>",
        err
    );
    res.status(err.status || 400).json({
        "msg": err.msg || err,
        "status": err.status || 400
    });

});

app.listen(
    6060,
    (err) => {

        if (err) {

            console.log("Server listening failed");

        } else {

            console.log("Server listening at port 6060");

        }

    }
);