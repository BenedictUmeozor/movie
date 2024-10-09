import mongoose from "mongoose";

export interface ISession {
  _id: string;
  user_id: string;
  expires_at: Date;
}

const sessionSchema = new mongoose.Schema<ISession>(
  {
    _id: { type: String, required: true },
    user_id: { type: String, required: true },
    expires_at: { type: Date, required: true },
  } as const,
  { _id: false },
);

const Session =
  (mongoose.models.Session as mongoose.Model<ISession>) ||
  mongoose.model<ISession>("Session", sessionSchema);

export default Session;
