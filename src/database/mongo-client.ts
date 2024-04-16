import { MongoClient as Mongo, Db, WithId } from "mongodb"
import { Usuario } from "../models/model"
import { connect } from "http2"

export const MongoClient = {
    db: undefined as Db,
    client: undefined as Mongo,

    async connect(): Promise<void>{
        const username = process.env.USERNAME
        const password = process.env.PASSWORD
        const url = process.env.URL

        const client = new Mongo(url, {auth: {username, password}})
        const db = client.db("controleF") 
        this.db = db
        this.client = client
        console.log("connected to database")
    },

    convertToUsuario(before: WithId<Omit<Usuario, "id">>): Usuario {
        const { _id, ...rest } = before;
        return { id: _id.toHexString(), ...rest }
    }

}