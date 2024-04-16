import { UserParams } from "../controllers/protocols";
import { MongoClient } from "../database/mongo-client";
import { Usuario } from "../models/model";

export class MongoRepository {
    public async createUser(params: UserParams): Promise<Usuario>{
        const {insertedId} = await MongoClient.db
            .collection<Omit<Usuario,"id">>("registros")
            .insertOne(params)
        
        const user = await MongoClient.db
        .collection<Omit<Usuario,"id">>("registros")
        .findOne(insertedId)

        if(!user){
            throw new Error ("User não cadastrado")
        }
        return MongoClient.convertToUsuario(user)
    }

    public async getUser(id: string): Promise<Usuario>{
        const user = await MongoClient.db
        .collection<Omit<Usuario,"id">>("registros")
        .findOne({id})
        
        if(!user){
            throw new Error ("User não encontrado")
        }
        return MongoClient.convertToUsuario(user)
    }

    
    public async getAllUsers(): Promise<Usuario[]>{
        const users = await MongoClient.db
        .collection<Omit<Usuario,"id">>("registros")
        .find({}).toArray()
        
        return users.map(u => MongoClient.convertToUsuario(u))
    }



}