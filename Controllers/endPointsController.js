const fs = require('fs')

exports.getEndpoints = (req, res, next) => {
  return fs.readFile('./endpoints.json', 'utf8', (error, data) => {
    if(error){console.log(error)}
    else {
        const parsedData = JSON.parse(data);
        res.status(200).send({endPoints: parsedData});
    }
})
};

