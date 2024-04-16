export interface UserParams {
    nome: string;
    email: string;
    senha: string;
    entrada: number;
    saida: number;
}

export interface HttpRequest<T>{
    body?: T; 
    headers?: any;
    params?: any;
}

export interface HttpResponse<N>{
    body: N | string;
    statusCode: number;
}