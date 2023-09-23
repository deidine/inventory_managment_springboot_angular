package net.javaguides.springboot.factory;

import net.javaguides.springboot.model.Buro;
import net.javaguides.springboot.model.Department;
// import net.javaguides.springboot.entity.Faculty;
import net.javaguides.springboot.model.Entite;
import net.javaguides.springboot.model.Etage;

/***
 * DepartmentFactory.java
 * 
 * @author Elvis Ndlangamandla (213063964)
 *         Date: 21 August 2022
 */
public class BuroFactory {
    public static Buro build(int id, Etage id_Etage, Entite id_entite) {
        return Buro.builder().id(id).entite(id_entite)
                .build();
    }
    public static Buro build( ) {
        return null;
    }
}