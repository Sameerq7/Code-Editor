const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const compiler = require("compilex");
const dotenv = require("dotenv");
let open;

// Initialize environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 8000;

// Initialize Compilex
const options = { stats: true };
compiler.init(options);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static(path.join(__dirname, "static")));

// Serve CodeMirror library
app.use("/codemirror-5.65.16", express.static(path.join(__dirname, "codemirror-5.65.16")));

// Routes
app.get("/problems", (req, res) => {
    res.sendFile(path.join(__dirname, "problems.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
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

// Start Server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});
