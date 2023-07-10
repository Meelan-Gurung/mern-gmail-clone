import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const Connection = () => {

  const DB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-qlv5rgb-shard-00-00.cd6k8ul.mongodb.net:27017,ac-qlv5rgb-shard-00-01.cd6k8ul.mongodb.net:27017,ac-qlv5rgb-shard-00-02.cd6k8ul.mongodb.net:27017/?ssl=true&replicaSet=atlas-jp89br-shard-0&authSource=admin&retryWrites=true&w=majority`

  try {
    
    mongoose.connect(DB_URI, { useNewUrlParser: true });
    console.log(`Database connected successfully`);


  } catch (error) {
    console.log('Error while connecting with database', error.message);
  }
}

export default Connection