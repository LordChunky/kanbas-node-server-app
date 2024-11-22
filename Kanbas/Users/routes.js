import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
    // Create User
    const createUser = (req, res) => { };

    // Delete User
    const deleteUser = (req, res) => { };

    // Find All User
    const findAllUsers = (req, res) => { };

    // Find User by ID
    const findUserById = (req, res) => { };

    // UPDATE USER
    // If a user updates their profile, then the session must be kept in synch.
    const updateUser = (req, res) => { 
        const userId = req.params.userId;
        const userUpdates = req.body;
        dao.updateUser(userId, userUpdates);
        const currentUser = dao.findUserById(userId);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);    
    };

    // SIGN UP
    // The signup route retrieves the username from the request body. 
    // If a user with that username already exists, an error is returned. 
    // Otherwise, create the new user and store it in the session's currentUser 
    // property to remember that this new user is now the currently logged-in user.
    const signup = (req, res) => { 
        const user = dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "Username already in use" });
            return;
        }
        const currentUser = dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };

    // SIGN IN
    // An existing user can identify themselves by providing credentials. 
    // The signin route below looks up the user by their credentials, stores 
    // it in currentUser session, and responds with the user if they exist. 
    // Otherwise responds with an error.
    const signin = (req, res) => { 
        const { username, password } = req.body;
        const currentUser = dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.status(401).json({ message: "Unable to login. Try again later." });
        }
      
    };

    // SIGN OUT
    // Users can be signed out by destroying the session.
    const signout = (req, res) => { 
        req.session.destroy();
        res.sendStatus(200);
    };

    // PROFILE
    // If a user has already signed in, the currentUser can be retrieved from 
    // the session by using the profile route as shown below. If there is no currentUser, 
    // an error is returned.
    const profile = (req, res) => { 
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        } 
    };

    // find courses to display for enrolled user
    const findCoursesForEnrolledUser = (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const courses = courseDao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    };

    // create a new course and then enroll the currentUser in the new course
    const createCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
    };


    // App posting
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
    app.post("/api/users/current/courses", createCourse);
}