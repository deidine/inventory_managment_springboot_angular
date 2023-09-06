package net.javaguides.springboot.controller;

import lombok.extern.slf4j.Slf4j;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
 import net.javaguides.springboot.model.Department; 
import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.factory.DepartmentFactory;
import net.javaguides.springboot.service.IDepartmentService;

import java.util.List;

/***
 * Department.java
 * 
 * @author Elvis Ndlangamandla (213063964)
 *         Date: 21 August 2022
 */

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("api/department")
@Slf4j
public class DepartmentController {

    private final IDepartmentService departmentService;

    @Autowired
    public DepartmentController(IDepartmentService departmentService) {
        this.departmentService = departmentService;
    }
    // @CrossOrigin(origins = "http://localhost:4200")

    @PostMapping("save")
    public ResponseEntity<Department> save(@RequestBody Department department) {
        log.info("Save Request: ", department);

        Department ValidateDepartment;
        try {
            ValidateDepartment = DepartmentFactory.build(department.getDepartmentName(),
                    department.getDepartmentUrl(),
                    department.getDepartmentTitre()
            // ,department.getFaculty()
            );
        } catch (IllegalArgumentException i) {
            log.info("Save error: ", i.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Department save = departmentService.save(ValidateDepartment);
        return ResponseEntity.ok(save);

    }

    @GetMapping("read/{id}")
    public ResponseEntity<Department> read(@PathVariable Integer id) {
        log.info("Read Request: ", id);
        Department department = this.departmentService.read(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(department);
    }

    @GetMapping("find-all")
    public ResponseEntity<List<Department>> findAll() {
        List<Department> departmentLists = this.departmentService.findAll();
        return ResponseEntity.ok(departmentLists);
    }

    // @RequestMapping("save")
    // static String hello() {
    // return "hello word";
    // }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        log.info("Delete Req: ", id);
        this.departmentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

	@PutMapping("update/{id}")
	public ResponseEntity<Department> updateDepartment(@PathVariable Integer id, @RequestBody Department departmentDetails){
		Department department = departmentService.read(id)
				.orElseThrow(() -> new ResourceNotFoundException("Department not exist with id :" + id));
		
		department.setDepartmentName(departmentDetails.getDepartmentName());
		department.setDepartmentTitre(departmentDetails.getDepartmentTitre());
		department.setDepartmentUrl(departmentDetails.getDepartmentUrl());
		
		Department updatedDepartment = departmentService.save(department);
		return ResponseEntity.ok(updatedDepartment);
	}





     
    
}
