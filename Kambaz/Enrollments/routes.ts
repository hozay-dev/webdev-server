import EnrollmentsDao from "./dao";
export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    res.json(dao.findEnrollmentsForUser(userId));
  };
  const enrollIntoCourse = (req, res) => {
    const { userId, courseId } = req.params;
    dao.enrollUserInCourse(userId, courseId);
    res.json(dao.findEnrollmentsForUser(userId));
  };
  const unenrollFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    dao.unenrollUserFromCourse(userId, courseId);
    res.json(dao.findEnrollmentsForUser(userId));
  };
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:userId/courses/:courseId", enrollIntoCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollFromCourse);
}
