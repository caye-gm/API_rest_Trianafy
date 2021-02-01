import mongoose from 'mongoose';
import { songs } from './songs';
const { Schema } = mongoose;


const listsSchema = new Schema({
    name: {
      type: String,
      },
    description: String,
    user_id: {
      type: mongoose.ObjectId,
      ref: 'users'
    },
    songs: [{
      type: mongoose.ObjectId,
      ref: 'songs'
    }]
  },{versionKey:false});




const lists = mongoose.model('lists', listsSchema);

const listsRepository = {

    async findAll() {
        const result =  await lists.find({}).populate('user_id').populate('songs').exec();
        return result;
    },
    async findById(id) {
        const result = await lists.findById(id).populate('songs').exec();
        return result != null ? result : undefined;
     },
     async create(newList) {
      const thelist = new lists({
        name: newList.name,
        description: newList.description != undefined ? newList.description : "",
        user_id: newList.user_id,
      });
      return await thelist.save();
    },
  async deleteList(id, idUser) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await lists.deleteOne({
        _id: id,
        user_id: idUser,
      }).exec();
    } else {
      return null;
    }
  },
  async editList(id, editList) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const list = await lists.findById(id).exec();
      if (list != null) {
        return await Object.assign(list, editList).save();
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  },
  async updateList(id, newList, user_id) {
    const list = await lists.findOne({
      _id: id,
      user_id: user_id,
    }).exec();
    if (list != null) {

      return await Object.assign(list,newList).save();
    } else {
      return undefined;
    }
  },
  
  async songOfList(idList, idSong, idUser) {
    if (
      mongoose.Types.ObjectId.isValid(idList) &&
      mongoose.Types.ObjectId.isValid(idSong)
    ) {
      const lista = await lists.findOne({
        _id: idList,
        user_id: idUser,
      }).populate({
        path: "songs",
        match: {
          _id: idSong,
        },
      }).exec();
      if (lista != null && lista.songs.length > 0) {
        return lista.songs[0];
      }
    }
    return null;
  },
  async songsOfList(idList, idUser) {
    if (
      mongoose.Types.ObjectId.isValid(idList) 
    ) {
      const lista = await lists.findOne({
        _id: idList,
        user_id: idUser,
      }).populate("songs").exec();
      if (lista != null && lista.songs.length > 0) {
        return lista.songs;
      }
    }
    return null;
  },
  
  async deleteSongOfList(idList, idSong, idUser) {
    if (
      mongoose.Types.ObjectId.isValid(idList) &&
      mongoose.Types.ObjectId.isValid(idSong)
    ) {
      let lista = await lists.findOne({
        _id: idList,
        user_id: idUser,
      }).populate("songs").exec();
      let song = await songs.findById(idSong).exec();
      if (song != null && song != null) {
        let index = undefined;
      
        for (let i = 0; i < lista.songs.length; i++) {
          if ((lista.songs[i]._id = idSong)) {
            index = i;
          }
        }
        lista.songs.splice(index, 1);
        await lista.save();
        return lista;
      }
    }
    return null;
  },
  async addSongOfList(idList, idSong, idUser) {
    if (
      mongoose.Types.ObjectId.isValid(idList) && mongoose.Types.ObjectId.isValid(idSong)
    ) {
      const lista = await lists.findOne({
        _id: idList,
        user_id: idUser,
      }).populate("songs").exec();
      console.log(lista);
      const song = await songs.findById(idSong);
      if (lista != null && song != null) {
       let bool=false
        lista.songs.forEach(v => {
          if(v==song){
            bool=true
          }
        });
        if(bool==false){
          lista.songs.push(song);
          await lista.save();
          return lista;
        }
      }
    }
    return null;
  }

}

export  {
    lists,
    listsRepository,
    
}