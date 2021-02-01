import mongoose from 'mongoose';
const { Schema } = mongoose;

const songsSchema = new Schema({
    title: String,
    artist: String,
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
    async deleteSong(id, idUser) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          return await songs.deleteOne({
            _id: id,
            user_id: idUser,
          }).exec();
        } else {
          return null;
        }
      },
    

}
export  {
    songs,
    songsRepository,
    
}