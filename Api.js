const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);
let open;
import('open').then(module => open = module.default);

// Use bodyParser middleware for parsing JSON bodies
app.use(bodyParser.json());

app.use("/codemirror-5.65.16", express.static("C:/Users/hp/Desktop/codeeditor/codemirror-5.65.16"));
app.get("/problems", function(req, res) {
    res.sendFile("C:\Users\hp\Desktop\codeeditor\problems.html");
});

// Serve index.html for all other routes
app.get("/", function(req, res) {
     //compiler.flush(function(){
    //     console.log("Deleted")
    // })
    res.sendFile("C:/Users/hp/Desktop/codeeditor/index.html");
});

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


// Start the server on port 8000
app.listen(8000, async function() {
    const serverUrl = "http://localhost:8000";
    console.log(`Server is running at ${serverUrl}`);
});
