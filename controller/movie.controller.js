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
   const { id } = req.params;
   const { buffer } = req.file;
   const imgDet = await fileUpload(buffer, uuid());
   const updateMovie = await Movie.findByIdAndUpdate(
     id,
     {
       title,
       description,
       category,
       genres,
       image: imgDet?.url,
       releasedate,
       year,
       director,
     }
   );
   if(!updateMovie){
        return res.status(409).json({message:"Failed to update movie details"})
   }
   
   res.status(201).json({message:"Update Movie SuccessFully !",success:true,updateMovie})
 } catch (error) {
    res.status(404).json({message:"Update movie Error"})
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
