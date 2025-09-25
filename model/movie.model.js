import mongoose, { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    releasedate: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    genres: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

 const Movie = model("Movie", movieSchema);
 export default Movie
