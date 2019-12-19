/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import { isEmail, isAlpha, isMobilePhone } from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: isEmail,
      message: '{VALUE} is not a valid email.',
      isAsync: false,
    },
    required: [true, 'Email is required.'],
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [6, 'Password should have more than 6 characters.'],
    trim: true,
  },

  firstName: {
    type: String,
    required: false,
    trim: true,
    validate: {
      validator: isAlpha,
      message: '{PATH} should contain only letters.',
      isAsync: false,
    },
  },
  lastName: {
    type: String,
    trim: true,
    validate: {
      validator: isAlpha,
      message: '{PATH} should contain only letters.',
      isAsync: false,
    },
  },
  dob: {
    type: Date,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: isMobilePhone,
      message: '{VALUE} is not a valid phone number.',
      isAsync: false,
      locale: 'en-UG',
      options: {
        strictMode: true,
      },
    },
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },

});

userSchema.plugin(uniqueValidator, { message: 'A user with {PATH} {VALUE} already exists.' });

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  // Search for a user by email and password
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ username }).exec();
  if (!user) {
    return { error: 'Invalid login credentials.' };
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return { error: 'Invalid login credentials.' };
  }
  return user;
};

userSchema.methods.toJSON = function () {
  // Remove some sensitive properties from the user response
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

const User = mongoose.model('User', userSchema);

export default User;
