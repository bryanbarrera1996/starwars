const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
app.use(express.static('./'));
app.listen(port, () => {
    console.log(`Express server listening on port: ${port}...`);
});