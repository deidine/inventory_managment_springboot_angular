package net.javaguides.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguides.springboot.model.Personnelle;

public interface IPerpsonnele extends JpaRepository<Personnelle, Long> {
}
