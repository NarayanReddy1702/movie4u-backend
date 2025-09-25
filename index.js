import app from "./app.js";
import DBconnection from "./config/db.js";

const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`App is runing on port ${port}`);
    DBconnection()
})