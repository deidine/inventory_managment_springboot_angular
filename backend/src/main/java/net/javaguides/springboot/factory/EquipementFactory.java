package net.javaguides.springboot.factory;

import net.javaguides.springboot.model.Buro;
import net.javaguides.springboot.model.Department;
// import net.javaguides.springboot.entity.Faculty;
import net.javaguides.springboot.model.Entite;
import net.javaguides.springboot.model.Equipement;

/***
 * DepartmentFactory.java
 * 
 * @author Elvis Ndlangamandla (213063964)
 *         Date: 21 August 2022
 */
public class EquipementFactory {
    public static Equipement build(String systeme_active, String anne_aquisition, String vendeur, Buro buro,
            String antivirus_active, String modele,  String reference,
            String type, String etat,
            String ordinateur) {
        return Equipement.builder().Systeme_active(systeme_active)
                .Anne_aquisition(anne_aquisition)
                .Antivirus_active(antivirus_active)
                .Modele(modele)
                .SiOrdinateur(ordinateur)
         
                .Type(type).Vendeur(vendeur).Etat(etat).Reference(reference)
                .buro(buro)
                .build();

    }
}