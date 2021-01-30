import mongoose from 'mongoose';
const { Schema } = mongoose;


const listsSchema = new Schema({
    name: {
      type: String,
      required: [true, 'El nombre es necesario'],
      minlength: [1, 'La cantidad mínima de caracteres es 1']
      },
    description: String,
    user: {
      type: mongoose.ObjectId,
      ref: 'users'
    },
    songs: [{
      type: mongoose.ObjectId,
      ref: 'songs'
    }]
  });




const lists = mongoose.model('lists', listsSchema);

const listsRepository = {

    async findAll() {
        const result =  await lists.find({}).populate('user').exec();
        return result;
    },
    async findById(id) {
        const result = await lists.findById(id).exec();
        return result != null ? result : undefined;
     },
    async create(nuevaList) {
      const list = new lists({
          name: nuevaList.name,
          description: nuevaList.description,
          user: nuevaList.user,
          songs: nuevaList.songs
      });
      const result = await list.save();
      return result;
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

}

export  {
    lists,
    listsRepository,
    
}