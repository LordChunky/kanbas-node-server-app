export default function PathParameters(app) {
    // route expects 2 path parameters after /lab5/add retrieve path parameters as strings parse 
    // as integers and adds sum as string sent back as response don't send integers since can be 
    // interpreted as status
    app.get("/lab5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });

    // route expects 2 path parameters after /lab5/subtract retrieve path parameters as strings
    // parse as integers and subtracts subtraction as string sent back as response response is 
    // converted to string otherwise browser would interpret integer response as a status code
    app.get("/lab5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
    });

    // multiply
    app.get("/lab5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) * parseInt(b);
        res.send(sum.toString());
    });

    // divide
    app.get("/lab5/divide/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) / parseInt(b);
        res.send(sum.toString());
    });
};
