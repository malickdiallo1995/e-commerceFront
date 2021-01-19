export class User {
    id?:number;
    nom?:String;
    prenom?:String;
    email?:String;
    login?:String;
    password?:String;
    idClient?:String;
    profil?:String;



    constructor(
        id?:number,
        nom?:String,
        prenom?:String,
        email?:String,
        login?:String,
        password?:String,
        idClient?:String,
        profil?:String
    ){

        this.id=id;
        this.nom=nom;
        this.prenom = prenom;
        this.email = email;
        this.login = login;
        this.password = password;
        this.idClient = idClient;
        this.profil = profil;
    }
}
