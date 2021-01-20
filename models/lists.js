import mongoose from 'mongoose';
const { Schema } = mongoose;

const listsSchema = new Schema({
    name: String,
    description: String,
    user_id: String,
    songs:String
});

const lists = mongoose.model('lists', listsSchema);

const listsRepository = {

    async findAll() {
        const result =  await lists.find({}).exec();
        return result;
    },
    async findById(id) {
        const result = await lists.findById(id).exec();
        return result != null ? result : undefined;
     }

}

export  {
    lists,
    listsRepository,
    
}