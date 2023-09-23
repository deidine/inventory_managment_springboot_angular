package net.javaguides.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository; 
import net.javaguides.springboot.model.Equipement;
/***
 * Department.java
 * @author Elvis Ndlangamandla (213063964)
 * Date: 21 August 2022
 */

@Repository
public interface IEquipementRepository extends JpaRepository<Equipement, Long> {

@Query(value=" Select * FROM equipement as equp join buro join etage on equp.id=?1",nativeQuery = true)
 Equipement read_Id(Long id);
 
}
