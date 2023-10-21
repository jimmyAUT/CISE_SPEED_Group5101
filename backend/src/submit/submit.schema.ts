import * as mongoose from 'mongoose';

export const submitSchema = new mongoose.Schema({
  title: String,
  authors: String,
  source: String,
  pubyear: String,
  doi: String,
  status: String,
  method: String,
});

export interface Submit extends mongoose.Document {
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  status: string;
  method: string;
}
