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
      image: imgUrl.url,
      releasedate,
      year,
      director,
    });

    if (!movie) {
      res.status(409).json({ message: "Failed to create movie" });
    }

    res
      .status(201)
      .json({ message: "Movie  added Successfully !", success: true, movie });
  } catch (error) {
    res.status(404).json({ message: "Failed to add movie" });
  }
}

async function allMovies(req, res) {
  try {
    const allMovies = await Movie.find();
    if (!allMovies) {
      return res
        .status(409)
        .json({ message: "Failed to get data from server", success: false });
    }
    res.status(201).json({
      message: "All movies got  successfully !",
      success: true,
      allMovies,
    });
  } catch (error) {
    res.status(404).json({ message: "Failed to get all movies" });
  }
}


 async function updateMovie(req, res) {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      genres,
      releasedate,
      year,
      director,
    } = req.body;

    // Validate movie ID
    if (!id) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    // Fetch existing movie to check if it exists
    const existingMovie = await Movie.findById(id);
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Handle image upload if a new file is provided
    let imageUrl = existingMovie.image;
    if (req.file?.buffer) {
      const imgDet = await fileUpload(req.file.buffer, uuidv4());
      imageUrl = imgDet?.url || existingMovie.image;
    }

    // Update the movie
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        genres,
        image: imageUrl,
        releasedate,
        year,
        director,
      },
      { new: true }
    );

    if (!updatedMovie) {
      return res
        .status(409)
        .json({ message: "Failed to update movie details" });
    }

    res
      .status(200)
      .json({
        message: "Movie updated successfully!",
        success: true,
        movie: updatedMovie,
      });
  } catch (error) {
    console.error("Error updating movie:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}


async function deleteMovie(req,res) {
     try {
      const {id}=req.params
   const deletedMovie =  await  Movie.findByIdAndDelete(id)

    if (!deletedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    res.status(201).json({
     message:"Delete Movie Successfully !" , success:true,deletedMovie
    })
     } catch (error) {
      res.status(404).json({message:"Failed to delete Movie",success:false})
     }
}

async function getMovieView(req,res){
     try {

      const {id}=req.params

      const getAMovie= await Movie.findById(id)

      if(!getAMovie){
       return  res.status(409).json({message:"Movie is not found"})
      }

      res.status(201).json({message:"Get Movie Successfully !",success:true,getAMovie})

     } catch (error) {
       res.status(404).json({message:"Failed to get one movie det",success:false})
     }
}


export { addMovie, allMovies, updateMovie,deleteMovie ,getMovieView};
