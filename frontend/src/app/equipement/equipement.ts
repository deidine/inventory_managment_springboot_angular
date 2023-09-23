import { Buro } from "../models/buro";

export class Equipement {
id:number;
    anne_aquisition: string;
    antivirus_active: string;
    etat: string;
    modele: string;
    siOrdinateur: string;
    reference: string;

    systeme_active: string;
    type: string;
    vendeur: string;
    buro: Buro;
    fiter_checked:any
}