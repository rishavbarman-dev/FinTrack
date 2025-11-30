import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "Rishav",
    lastName: "Barman",
    email: "rishavbarman7@gmail.com",
    password: bcrypt.hashSync("techtoy", 10),
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
