const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Scheme = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email : {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  }
})

// Fire a function before doc is saved to db
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next();
});

// Static method to Login User
UserSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if(user) {
   const auth = await bcrypt.compare(password, user.password);

   if(auth) {
     return user
   } 

   throw Error('incorrect password');
  }
  throw Error('incorrect email');
}
User = mongoose.model('user', UserSchema);
module.exports = User;