const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt"); // encrypt password

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// with UserSchema.pre( ‘ save ’... , we tell Mongoose that before we save any record into the
// Users schema or Users collection, execute the function passed into the 2 nd argument.
// This lets us change user data before saving it into the database.

// *Note that we have to specify function(next) instead of using the lambda short form of a function
// i.e. next => {...} . I am not too sure why the lambda short form doesn’t work.

// In the function, we first get the user being saved with const user = this.
// mongoose makes the UserSchema available via 'this'.

// We then proceed to call bcrypt.hash whose first argument takes in the password which to be hashed.
// The second argument specifies the number of rounds of hashing to take place. For example,
// we have specified 10 which means that the password will be encrypted 10 times. You can specify 100 or
// more times to make more secure but slower

// The third argument is the function that is called when the hash completes.
// user.password = hash replaces the original password with its encrypted version.
// We then call next() so that mongoose can continue creating the user data.

UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
