import UsersDao from "./dao";
export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
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
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = { ...dao.findUserById(userId), ...req.body };
    dao.updateUser(userId, userUpdates);
    const updatedUser = dao.findUserById(userId);
    const currentUser = req.session["currentUser"];
    // only when its me, faculty can edit other people too
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = updatedUser;
    }
    res.json(updatedUser);
  };
  const findUsersForCourse = (req, res) => {
    const courseId = req.params.courseId;
    const people = dao.findUsersForCourse(courseId);
    const safePeople = people.map((person) => {
      return { ...person, password: undefined };
    });
    res.json(safePeople);
  };
  const createUser = (req, res) => {
    const newUser = dao.createUser(req.body);
    res.json(newUser);
  };
  const deleteUser = (req, res) => {
    const userId = req.params.userId;
    dao.deleteUser(userId);
    res.sendStatus(200);
  };
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);
  app.put("/api/users/:userId", updateUser);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.post("/api/users", createUser);
  app.delete("/api/users/:userId", deleteUser);
}
