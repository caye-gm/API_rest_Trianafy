import mongoose from 'mongoose';
const { Schema } = mongoose;

const songsSchema = new Schema({
    title: String,
    artist: String,
    album: String,
    year:String
});

const songs = mongoose.model('songs', songsSchema);

const songsRepository = {
    
    
    async findAll() {
        const result =  await songs.find({}).exec();
        return result;
    },
    async findById(id) {
        const result = await songs.findById(id).exec();
        return result != null ? result : undefined;
     }


}
export  {
    songs,
    songsRepository,
    
}