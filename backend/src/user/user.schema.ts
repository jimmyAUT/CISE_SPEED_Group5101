/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

export interface User extends mongoose.Document {
  email: string;
  password: string;
  role: string;
}
