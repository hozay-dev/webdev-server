import { v4 as uuidv4 } from "uuid";
export default function UsersDao(db) {
  let { users } = db;
  const findUserByCredentials = (username, password) =>
    users.find((user) => user.username === username && user.password === password);
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    users = [...users, newUser];
    return newUser;
  };
  const findUserByUsername = (username) =>
    users.find((user) => user.username === username);
  const findUserById = (userId) =>
    users.find((user) => user._id === userId);
  const updateUser = (userId, user) =>
    (users = users.map((u) => (u._id === userId ? user : u)));
  const findUsersForCourse = (courseId) =>
    users.filter((user) =>
      db.enrollments.some(
        (enrollment) =>
          enrollment.user === user._id && enrollment.course === courseId,
      ),
    );
  const deleteUser = (userId) => {
    users = users.filter((u) => u._id !== userId);
    db.enrollments = db.enrollments.filter((enrollment) => enrollment.user !== userId);
  };
  return {
    findUserByCredentials,
    createUser,
    findUserByUsername,
    findUserById,
    updateUser,
    findUsersForCourse,
    deleteUser,
  };
}
