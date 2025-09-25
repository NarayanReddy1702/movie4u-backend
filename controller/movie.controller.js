import Movie from "../model/movie.model.js";
import fileUpload from "../service/storage.service.js";
import { v4 as uuid } from "uuid";
async function addMovie(req, res) {
  try {
    const {
      title,
      description,
      category,
      genres,
      image,
      releasedate,
      year,
      director,
    } = req.body;

    const { buffer } = req.file;
    const imgUrl = await fileUpload(buffer, uuid());
    if (!imgUrl) {
      return res.status(409).json({ message: "Failed to get url of image " });
    }

    const movie = await Movie.create({
      title,
      description,
      category,
      genres,
      image:imgUrl.url,
      releasedate,
      year,
      director,
    });

    if(!movie){
        res.status(409).json({message:"Failed to create movie"})
    }

    res.status(201).json({message:"Movie  added Successfully !" , success:true , movie})
  } catch (error) {
    res.status(404).json({ message: "Failed to add movie" });
  }
}

export { addMovie };
