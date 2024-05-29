const {selectEndPoints} = require('../Models/selectEndPoints')
const fs = require('fs')

exports.getEndpoints = (req, res, next) => {
  return fs.readFile('./endpoints.json', 'utf8', (error, data) => {
    if(error){console.log(error)}
    else {
        const parsedData = JSON.parse(data);
        // console.log(parsedData)
        res.status(200).send({endPoints: parsedData});
    }
})
};

