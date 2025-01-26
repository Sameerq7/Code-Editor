const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compiler = require("compilex");
const path = require("path");

// Initialize compiler
const options = { stats: true };
compiler.init(options);

// Use bodyParser middleware for parsing JSON bodies
app.use(bodyParser.json());

// Serve index.html from the root folder
app.get("/", function(req, res) {
    compiler.flush(function(){
        console.log("Deleted")
    })
    res.sendFile(path.join(__dirname, "index.html"));
});

// Serve assessment.html from the public folder
app.get("/assessment", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "assessment.html"));
});

// Serve problems.html from the public folder
app.get("/problems", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "problems.html"));
});

// Serve ide.html from the public folder
app.get("/ide", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "ide.html"));
});

// Endpoint for compiling code
app.post("/compile", function(req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
    try {

        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++" ,options:{timeout:10000}};
                compiler.compileCPP(envData, code, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "Error in Compilation" });
                    }

                });

            } else {
                var envData = { OS: "windows", cmd: "g++",options:{timeout:10000} };

                compiler.compileCPPWithInput(envData, code, input, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "Error in Compilation" });
                    }
                });
            }
        } else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };

                compiler.compileJava(envData, code, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "Error in Compilation" });
                    }
                });
            } else {
                var envData = { OS: "windows" };

                compiler.compileJavaWithInput(envData, code, input, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "Error in Compilation" });
                    }
                });

            }
        } else if(lang=="Python") {
            if (!input) {
                var envData = { OS: "windows" };

                compiler.compilePython(envData, code, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "Error in Compilation" });
                    }
                });
            } else {
                var envData = { OS: "windows" };

                compiler.compilePythonWithInput(envData, code, input, function(data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "Error in Compilation" });
                    }
                });
            }
        }

    } catch (e) {
        console.log("error");
    }
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Start the server on port 8000
app.listen(8000, function() {
    console.log("Server is running on port 8000");
});
