import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
    // Create User
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    

    // Delete User
    const deleteUser = async (req, res) => { 
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };

    // Find All User
    const findAllUsers = async (req, res) => {
        const { role, name } = req.query;
        if (role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        }
        if (name) {
            const users = await dao.findUsersByPartialName(name);
            res.json(users);
            return;
        }
      
        const users = await dao.findAllUsers();
        res.json(users);
    };
    

    // Find User by ID
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };


    // UPDATE USER
    // If a user updates their profile, then the session must be kept in synch.
    const updateUser = async (req, res) => { 
        const userId = req.params.userId;
        const userUpdates = req.body;
        await dao.updateUser(userId, userUpdates);
        const currentUser = req.session["currentUser"];
        if (currentUser && currentUser._id === userId) {
          req.session["currentUser"] = { ...currentUser, ...userUpdates };
        }
        res.json(currentUser);    
    };

    // SIGN UP
    // The signup route retrieves the username from the request body. 
    // If a user with that username already exists, an error is returned. 
    // Otherwise, create the new user and store it in the session's currentUser 
    // property to remember that this new user is now the currently logged-in user.
    const signup = async (req, res) => { 
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "Username already in use" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };

    // SIGN IN
    // An existing user can identify themselves by providing credentials. 
    // The signin route below looks up the user by their credentials, stores 
    // it in currentUser session, and responds with the user if they exist. 
    // Otherwise responds with an error.
    const signin = async (req, res) => { 
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
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
    const profile = async (req, res) => { 
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser); 
    };

    // create a new course and then enroll the currentUser in the new course
    const createCourse = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
    };

    const findCoursesForUser = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(401);
          return;
        }
        if (currentUser.role === "ADMIN") {
          const courses = await courseDao.findAllCourses();
          res.json(courses);
          return;
        }
        let { uid } = req.params;
        if (uid === "current") {
          uid = currentUser._id;
        }
        const courses = await enrollmentsDao.findCoursesForUser(uid);
        res.json(courses);
    };
    
    // Enroll user
    const enrollUserInCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
          const currentUser = req.session["currentUser"];
          uid = currentUser._id;
        }
        const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
        res.send(status);
    };

    // Unenroll user
    const unenrollUserFromCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
          const currentUser = req.session["currentUser"];
          uid = currentUser._id;
        }
        const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
        res.send(status);
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
    app.post("/api/users/current/courses", createCourse);


    // app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
    app.get("/api/users/:uid/courses", findCoursesForUser);

    app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
    app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
