package net.javaguides.springboot.service;

import net.javaguides.springboot.model.Entite;

public interface IEntiteService extends IService<Entite, Long>{
    void deleteById(Long facultyId);
}
