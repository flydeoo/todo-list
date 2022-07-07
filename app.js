const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { response } = require('express');
const { json } = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname+'/todo'));
app.get('/',(req,res)=>{

    res.sendFile(path.resolve(__dirname+'/todo/index.html'));


});

app.post('/request', (req, res)=>{

    const inputVal = {text} = req.body;
    // console.dir(inputVal);
    console.log("this is input val => " + inputVal.text);
    
    if(!inputVal){
        res.status(400).send({"msg": "empty input"});
        return;
    }

    const file_path = path.resolve(__dirname+'/todo/save/data.json');
    fs.readFile(file_path, (err, data)=>{
        if(err){
            res.status(500).send({"msg": "not found"});
            return;
        }

        data = JSON.parse(data);
        data.push(inputVal);
        data = JSON.stringify(data);

        fs.writeFile(file_path, data, err =>{
            if(err){
                res.status(500).send({"msg": "can not write file"});
                return;              
            }

            res.send(inputVal.text);

        })

    });
    

    // console.log(req.url);
});


app.get('/getList',(req,res)=>{

    const file_path = path.resolve(__dirname+'/todo/save/data.json');
    fs.readFile(file_path, (err, data)=>{

        if(err){
            res.status(500).send('Error in reading file');
            return;
        }

        // if we don't parse the json , content type == application/octet-stream
        data = JSON.parse(data);
        res.send(data);

    });




});


app.listen(1010);