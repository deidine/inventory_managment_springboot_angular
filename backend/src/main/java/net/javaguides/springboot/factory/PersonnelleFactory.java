package net.javaguides.springboot.factory;

import net.javaguides.springboot.model.Buro;

/*
author: Ameer Ismail
student nr: 218216033
factory: Student Factory
ADP 3 Assignment Group1
*/


import net.javaguides.springboot.model.Personnelle;

public class PersonnelleFactory
{
    public static Personnelle createPersonnelle (String Email,String fn_dans_entite,
    Buro buro,  String nom, String role_systm,Long telephone
    )
    {
        return Personnelle.builder()
                .buro(buro)
                .Email(Email)
                .fn_dans_entite(fn_dans_entite)
                .nom(nom)
                .telephone(telephone)
                .role_systm(role_systm)
                .build();
    }

 
 

    
}