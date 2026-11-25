import EnrollmentsDao from "./dao";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findEnrollmentsForUser = (req, res) => {
    const userId = req.params.userId;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const enrollIntoCourse = (req, res) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    dao.enrollUserInCourse(userId, courseId);
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const unenrollFromCourse = (req, res) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    dao.unenrollUserFromCourse(userId, courseId);
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:userId/courses/:courseId", enrollIntoCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollFromCourse);
}
