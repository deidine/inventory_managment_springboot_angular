package net.javaguides.springboot.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Etage; 
@Repository
public interface IEtageRepository extends JpaRepository<Etage, Integer>{

@Query(value=" Select * FROM  etage where id=?1",nativeQuery = true)
    Etage read(Integer id);
    
}
