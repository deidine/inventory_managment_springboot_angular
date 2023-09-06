package net.javaguides.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import net.javaguides.springboot.model.Department;

import net.javaguides.springboot.repository.IDepartmentRepository;


import java.util.List;
import java.util.Optional;

/***
 * Department.java
 * @author Elvis Ndlangamandla (213063964)
 * Date: 21 August 2022
 */
@Service
public class DepartmentServicelmpl implements IDepartmentService{
    private final IDepartmentRepository repository;

    @Autowired
    public DepartmentServicelmpl(IDepartmentRepository repository)
    {
        this.repository = repository;
    }

    @Override
    public Department save(Department object) {
        return repository.save(object);
    }

    @Override
    public Optional<Department> read(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<Department> findAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Department object) {
        repository.delete(object);
    }

    public void deleteById(Integer departmentId) {
        repository.deleteById(departmentId);
    }
}


