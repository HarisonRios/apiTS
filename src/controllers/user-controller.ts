import { HttpRequest, HttpResponse, UserParams } from './protocols';
import { MongoRepository } from "../repositories/mongo-repository";
import { Usuario } from '../models/model';

export class UserController {
   constructor(private readonly repository: MongoRepository){}

   async getUser(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<Usuario>>{
    try{
        const id = httpRequest.params?.id
        if(!id){
            return{
                statusCode: 400,
                body: "O id é obrigatorio"
            }
        }
        const user = await this.repository.getUser(id)
        return{
            statusCode: 200,
            body: user
        }

    }catch(error){
        return{ 
            statusCode: 500,
            body: "Algo deu errado!!"
        }
    }
   }




   async getAllUsers(): Promise<HttpResponse<Usuario[]>>{
    try{
        const users = await this.repository.getAllUsers()
        return{
            statusCode: 200,
            body: users
        }

    }catch(error){
        return{ 
            statusCode: 500,
            body: "Algo deu errado!!"
        }
    }
   }


   async createUser(httpRequest: HttpRequest<UserParams>): Promise<HttpResponse<Usuario>>{
    try{
        const body = httpRequest.body
        if(!body){
            return{
                statusCode: 400,
                body: "O corpo da requisição é obrigatorio"
            }
        }
        const user = await this.repository.createUser(body)
        return{
            statusCode: 200,
            body: user
        }
    }catch(error){
        return{ 
            statusCode: 500,
            body: "Algo deu errado!!"
        }
    }
   }


}