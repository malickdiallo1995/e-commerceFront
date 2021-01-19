export class Forfait {
    id?:number;
    type?:String;
    nom?:String;
    description?:String;
    typePrePostPaid?:String;
    montant?:number;
    IdOperateur?:number;
    image?:String;
    validite?: String;
    voice?: String;
    sms?: String;
    data?: String;
    urlImage?: String;
    

    constructor(
    id?:number,
    type?:String,
    nom?:String,
    description?:String,
    typePrePostPaid?:String,
    montant?:number,
    IdOperateur?:number,
    image?:String,
    validite?: String,
    voice?: String,
    sms?: String,
    data?: String,
    urlImage?: String
    ){

        this.id = id;
        this.type = type;
        this.nom = nom;
        this.description =  description;
        this.typePrePostPaid= typePrePostPaid;
        this.montant = montant;
        this.IdOperateur = IdOperateur;
        this.image = image;
        this.validite = validite;
        this.voice = voice;
        this.sms = sms;
        this.data = data;
        this.urlImage = urlImage;

    }
}