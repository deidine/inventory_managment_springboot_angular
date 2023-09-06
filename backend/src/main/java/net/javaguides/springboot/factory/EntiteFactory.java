package net.javaguides.springboot.factory;

import java.util.Set;

import net.javaguides.springboot.model.Department;
import net.javaguides.springboot.model.Entite;

public class EntiteFactory {
    public static Entite build(long EntiteId, String Mougattaa, String Wilayas, String affectation/* ,Department department*/) {
        return Entite.builder().entiteId(EntiteId)
                .Mougattaa(Mougattaa)
                .Wilayas(Wilayas)
                .affectation(affectation)
                // .department((Set<Department>) department)
                .build();
    }

    public static Entite build(long entiteId, String entiteName, Set<Department> departments) {
        return null;
    }
}