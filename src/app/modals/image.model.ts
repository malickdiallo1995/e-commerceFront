export class Image {
    id?:number;
    url?:string;
    idTelephone?:string;
    

    constructor(
        id?:number,
        url?:string,
        idTelephone?:string,
    ){

        this.id = id;
        this.url = url;
        this.idTelephone = idTelephone;

    }
}