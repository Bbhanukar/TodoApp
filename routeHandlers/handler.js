let response = require("../libs/responseLib");
let fs = require('fs');
let dataStore = './storage.json'

let date = new Date;
let data = JSON.parse(fs.readFileSync(dataStore));

// add new task
function addwork(req, res) {
    let reqBody = JSON.parse(JSON.stringify(req.body));

    let curr_data = response.generate(false, reqBody.id, reqBody.name, date, date, reqBody.status);
    let match = false;

    for (let i = 0; i < data.length; i++) {
        if (data[i].id == reqBody.id) {
            match = true
            break;
        }
    }
    if (match == false) data.push(curr_data);

    fs.writeFileSync(dataStore, JSON.stringify(data), function writeJSON(err) {
        if (err) return console.log(err);
    })
    res.send(curr_data);
    console.log("addwork request received")
}

//view task-list
function viewlist(req, res) {


    console.log("view Api called");
    console.log(req.query);
    if (req.query) {
        let req_id = req.query.id;
        let match = false
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == req_id) {
                match = true;
                res.send(data[i]);
                break;
            }
        }
        if (match == false) {
            res.send("this id does not exist!")
        }

    } else {
        res.send(data);
    }
}

//modify a task by id
function modify(req, res) {
    let reqBody = JSON.parse(JSON.stringify(req.body));

    let match = false;
    let curr_data;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == reqBody.id) {
            curr_data = response.generate(false, reqBody.id, reqBody.name, data[i].initTime, date, reqBody.status);

            fs.writeFileSync(dataStore, JSON.stringify(data));
            match = true;
            break;
        }
    }
    if (match == true) {
        res.send(curr_data);
    } else {
        res.send("this id does not exist")
    }
    console.log("modify Api called");
}

//remove a task by id
function remove(req, res) {
    let reqBody = JSON.parse(JSON.stringify(req.body));

    let match = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == reqBody.id) {
            res.send(data[i]);
            data.splice(i, 1);
            fs.writeFileSync(dataStore, JSON.stringify(data));
            match = true;
            break;
        }
    }

}

module.exports = {
    addwork: addwork,
    viewlist: viewlist,
    modify: modify,
    remove: remove
}