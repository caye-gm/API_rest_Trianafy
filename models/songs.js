import mongoose from 'mongoose';
import { list, lists } from "./lists";
const { Schema } = mongoose;

const songsSchema = new Schema({
    title: {
      type: String,
      required:"Introduce un título",
      
      },
    artist: {
      type: String,
      required:"Introduce un artista"
      },
    album: String,
    year: Number
},{versionKey:false});

const songs = mongoose.model('songs', songsSchema);

const songsRepository = {
    
    
    async findAll() {
        const result =  await songs.find({}).exec();
        return result;
    },
    async findById(id) {
        const result = await songs.findById(id).exec();
        return result != null ? result : undefined;
     },

    async create(nuevaSong) {
        const song = new songs({
            title: nuevaSong.title,
            artist: nuevaSong.artist,
            album: nuevaSong.album,
            year: nuevaSong.year
        });

        const result = await song.save();
        return result;
    },
    async deleteSong(id) {
      
      if (mongoose.Types.ObjectId.isValid(id)) {
        return await songs.deleteOne({
          _id: id,
          }).exec();
      } else {
        return undefined;
      }
    }
    ,
      async editSong(id, editSong) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const song = await songs.findById(id).exec();
          if (song != null) {
            return await Object.assign(song, editSong).save();
          } else {
            return undefined;
          }
        } else {
          return undefined;
        }

}
}
export  {
    songs,
    songsRepository,
    
}