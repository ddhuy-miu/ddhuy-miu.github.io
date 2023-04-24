var express = require("express");
var body_parser = require('body-parser')

var app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));


let CourseID = 3;
let Courses = {
    1: {
        id: 1,
        code: "CS401-2023-03A-03D-01",
        name: "Modern Practice Programming",
        lecture: "Bright Varghese"
    },
    2: {
        id: 2,
        code: "CS472-2023-04A-04D-01",
        name: "Web Application Programming",
        lecture: "Ankhtuya Ochirbat"
    },
    3: {
        id: 3,
        code: "CS435-2023-05A-05D-02",
        name: "Algorithm",
        lecture: "Paul Corazza"
    }
};


app.get("/courses", function (request, response) {
    response.send(Courses);
});

app.get("/courses/:id", function (request, response) {
    var id = request.params.id;
    response.send(Courses[id]);
});


app.post("/courses", function (request, response) {
    CourseID += 1;
    Courses[CourseID] = {
        id: CourseID,
        code: request.body.code,
        name: request.body.name,
        lecture: request.body.lecture
    };
    console.log(Courses);
    response.send(Courses[CourseID]);
});


var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("ExpressJS is running at http://%s:%s", host, port);
});
