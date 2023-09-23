package net.javaguides.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.javaguides.springboot.model.Entite;
import net.javaguides.springboot.repository.IEntiteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EntiteServiceImpl implements IEntiteService {

    IEntiteRepository repository;

    @Autowired
    public EntiteServiceImpl(IEntiteRepository repository)
    {
        this.repository = repository;
    }

    @Override
    public Entite save(Entite object)
    {
        return repository.save(object);
    }

    @Override
    public Optional<Entite> read(Long id)
    {
        return null;//repository.findById(id);
    }

    @Override
    public List<Entite> findAll()
    {
        return repository.findAll();
    }

    @Override
    public void delete(Entite object)
    {
        repository.delete(object);
    }

    @Override
    public void deleteById(Integer EntiteId)
    {
        repository.deleteById(EntiteId);
    }
}


