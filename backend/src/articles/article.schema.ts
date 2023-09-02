/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  title: String,
  authors: String,
  source: String,
  pubyear: String,
  doi: String,
  claim: String,
  evidence: String,
});

export interface Article extends mongoose.Document {
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
}
