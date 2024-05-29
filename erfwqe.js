const { error } = require('console');
const fs = require('fs');


function returnData(){
fs.readFile('./endpoints.json', 'utf8', (error, data) => {
    if(error){console.log(error)}
    else {
        const parsedData = JSON.parse(data);
        console.log(data)
    }
})
}

returnData()