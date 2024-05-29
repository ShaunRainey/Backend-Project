const db = require("../db/connection");
const fs = require('fs')

exports.selectEndPoints = () => {
    const fileContents = fs.readSync('../endpoints.json','utf8')
    console.log(fileContents)
    }