import mongoose from "mongoose";
var Schema = mongoose.Schema;

const Remark = mongoose.model(
  "Remark",
  new mongoose.Schema(
    {
      note: {
        type: String,
        required: false,
      },
      filmId: { type: Schema.Types.ObjectId, ref: "Film" },
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      rate: {
        type: Number,
        required: false,
        validate: {
          validator: Number.isInteger,
          message: '{VALUE} is not an integer value'
        },
        min: 1,
        max: 10
      },
    },
    {
      timestamps: true,
    }
  ),
  "Remark"
);

export default Remark;
