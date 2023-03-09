import mongoose from "mongoose";

const Film = mongoose.model(
    "Film",
    new mongoose.Schema(
        {
            externalId: {
                type: Number,
                required: true,
            },
            original_title: {
                type: String,
            },
            overview: {
                type: String,
            },
            poster_path: {
                type: String,
            },
            remarks: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Remark"
                }
            ]
        },
        {
            timestamps: true,
        }
    ),
    "Film"
);

export default Film;
