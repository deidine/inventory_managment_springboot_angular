package net.javaguides.springboot.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.AppUser;
@Repository

public interface UserRepository extends JpaRepository<AppUser, Integer> {

  boolean existsByUsername(String username);
   
  // @Query("select username from app_user where id=?1")
  // AppUser readU(Integer id);

  AppUser findByUsername(String username);

  @Transactional
  void deleteByUsername(String username);

}
