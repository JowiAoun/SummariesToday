import User from "./schemas/User";


function testCreateUser() {
    /* Create a new user and save it to the database
    */
    const newUser = new User({
        username: 'John Doe',
        email: 'johndoe@example.com',
        age: 30,
        country: "CA",
        documents: [
            {
                title: "Test document",
                age: "10"
            }
        ]
    });
    
    newUser.save()
    .then(savedUser => {
        console.log('User saved:', savedUser);
    })
    .catch(error => {
        console.error('Error saving user:', error);
  });
}


export default testCreateUser;