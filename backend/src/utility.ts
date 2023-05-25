import User from "./schemas/User";

function testCreateUser() {
  // Creates a new user and save it to the database
  const newUser = new User({
    username: "John Doe",
    email: "johndoe@example.com",
    password: "abc123",
    age: 30,
    country: "CA",
    books: [
      {
        title: "Book 1",
        text: "Computer science truly has endless posibilities.",
        age: 10,
      },
      {
        title: "Book 2",
        text: "Physics is very cool. This is why...",
        age: 55430,
      },
    ],
  });

  newUser.save()
}

export default testCreateUser;
