import * as user from './user';
import * as songs from './songs'
import * as lists from './lists'
import bcrypt from 'bcryptjs';

const datas ={

    async comprobarDatos(){
    
        const result1 = await lists.lists.countDocuments({}).exec();
        const result2 = await user.user.countDocuments({}).exec();
        const result3 = await songs.songs.countDocuments({}).exec();
        if (result1 == 0 && result2 == 0 && result3 == 0){
            
            const theUser1 = new user.user({
                name: "Luis Miguel López",
                username: "luismi",
                email: "luismi@salesianos.com",
                password: bcrypt.hashSync("12345678", parseInt(process.env.BCRYPT_ROUNDS))
            });
            const user1 = await theUser1.save();
            const theUser2 = new user.user({
                name: "Miguel Campo",
                username: "miguelCampo",
                email: "miguel.campos@salesianos.com",
                password: bcrypt.hashSync("1234", parseInt(process.env.BCRYPT_ROUNDS))
            });
            const user2 = await theUser2.save();
            const theSong1 = new songs.songs({
                title:"Ahora soy peor",
                artist: "Bad Bunny", 
                album: "Unknow",
                year: 2018
            });
            const song1 = await theSong1.save();
            const theSong2 = new songs.songs({
                title:"Money",
                artist: "Galactic", 
                album: "Thirst",
                year: 2017
            });
            const song2 = await theSong2.save();
            const theSong3 = new songs.songs({
                title:"frozen",
                artist: "disney", 
                album: "disney",
                year: 2019
            });
            const song3 = await theSong3.save();
            const theList1 = new lists.lists({
                name: "Mis canciones",
                description: "Canciones de power metal", 
                user_id: user1.id,
                songs: [song3.id]
              });
              const list1 = await theList1.save();
              const theList2 = new lists.lists({
                name: "Temazos",
                description: "Canciones para el coche", 
                user_id: user2.id,
                songs: [song1.id, song2.id]
              });
              const list2 = await theList2.save();
            
            console.log("No existen datos, por lo tanto hemos cargado datos por defectos!");
        }
        
    }
}


export default {
    user,
    songs,
    lists,
    datas
    
}