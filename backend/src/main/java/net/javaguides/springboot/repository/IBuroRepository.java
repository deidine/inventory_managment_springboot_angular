package net.javaguides.springboot.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Buro; 
@Repository
public interface IBuroRepository extends JpaRepository<Buro, Integer>{
@Query(value=" Select * FROM buro where id=?1",nativeQuery = true)
 
    Buro read(Integer id);
    
}
