/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const RejectedSchema = new mongoose.Schema({
  title: String,
  authors: String,
  source: String,
  pubyear: String,
  doi: String,
  comment: String,
});

export interface Rejected extends mongoose.Document {
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  comment: string;
}
