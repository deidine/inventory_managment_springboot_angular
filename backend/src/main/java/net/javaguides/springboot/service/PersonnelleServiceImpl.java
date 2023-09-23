package net.javaguides.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.javaguides.springboot.model.Entite;
import net.javaguides.springboot.model.Personnelle;
import net.javaguides.springboot.repository.IEntiteRepository;
import net.javaguides.springboot.repository.IPerpsonnele;

import java.util.List;
import java.util.Optional;

@Service
public class PersonnelleServiceImpl implements IPersonnelleService {

    IPerpsonnele repository;

    @Autowired
    public PersonnelleServiceImpl(IPerpsonnele repository)
    {
        this.repository = repository;
    }

    @Override
    public Personnelle save(Personnelle object) {
        // TODO Auto-generated method stub
       return repository.save(object); }

    @Override
    public void delete(Personnelle object) {
        // TODO Auto-generated method stub
        repository.delete(object);}

    @Override
    public void deleteById(Long id) {
        // TODO Auto-generated method stub
       repository.deleteById(id);
   }
 
    
    @Override
    public List<Personnelle> findAll() {  
        return repository.findAll();}
        
        @Override
        public Optional<Personnelle> read(Long id) {
            // TODO Auto-generated method stub
             return repository.findById(id);
    }

 
}


