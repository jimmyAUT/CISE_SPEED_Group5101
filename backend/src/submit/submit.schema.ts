/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const submitSchema = new mongoose.Schema({
  title: String,
  authors: String,
  source: String,
  pubyear: String,
  doi: String,
  comment: String,
  status: String,
});

export interface Submit extends mongoose.Document {
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  comment: string;
  status: string;
}
