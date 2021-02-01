import mongoose from 'mongoose';
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
        const result = await lists.findById(id).exec();
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
  //////
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
  /*
  async eliminarCancionLista(idList, idSong, idUser) {
    if (
      mongoose.Types.ObjectId.isValid(idList) &&
      mongoose.Types.ObjectId.isValid(idSong)
    ) {
      let lista = await ListaReproduccion.findOne({
        _id: idList,
        user_id: idUser,
      }).populate("songs").exec();
      let song = await Cancion.findById(idSong).exec();
      if (song != null && song != null) {
        let indiceBorrar = undefined;
        //Voy ha hacer una especie de indexOf para obtener el indice de una canción en la lista de canciones de una playlist
        for (let i = 0; i < lista.canciones.length; i++) {
          if ((lista.canciones[i]._id = idSong)) {
            indiceBorrar = i;
          }
        }
        lista.canciones.splice(indiceBorrar, 1);
        await lista.save();
        return lista;
      }
    }
    return null;
  },*/
  

}

export  {
    lists,
    listsRepository,
    
}