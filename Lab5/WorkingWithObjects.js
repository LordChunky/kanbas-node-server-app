const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
};

const module = {
    id: 1, 
    name: "NodeJS Module",
    description: "Module Object",
    course: "Web Development Fall 2024",
};

export default function WorkingWithObjects(app) {
    // Assignment
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });

    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });
    
    // modify title of Assignment
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    // modify score of Assignment
    app.get("/lab5/assignment/score", (req, res) => {
        res.json(assignment.score);
    });
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment);
    });


    // modify completed property of Assignment
    app.get("/lab5/assignment/completed", (req, res) => {
        res.json(assignment.completed);
    });
    app.get("/lab5/assignment/completed/:newStatus", (req, res) => {
        const { newStatus } = req.params;
        assignment.completed = newStatus;
        res.json(assignment);
    });



    
    // Module
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });

    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
    });

    app.get("/lab5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });

    // modify description of module
    app.get("/lab5/module/description", (req, res) => {
        res.json(assignment.description);
    });
    app.get("/lab5/module/description/:newDescription", (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
    });
};
