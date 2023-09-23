package net.javaguides.springboot.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Etage; 
@Repository
public interface IStageRepository extends JpaRepository<Etage, Integer>{
    
}
