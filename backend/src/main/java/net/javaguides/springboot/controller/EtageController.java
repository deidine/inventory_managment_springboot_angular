package net.javaguides.springboot.controller;

import lombok.extern.slf4j.Slf4j;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import net.javaguides.springboot.model.Etage;
import net.javaguides.springboot.repository.IEtageRepository;
import net.javaguides.springboot.dto.UserResponseDTO;
import net.javaguides.springboot.exception.ResourceNotFoundException; 

import java.util.List;

/***
 * Etage.java
 * 
 * @author Elvis Ndlangamandla (213063964)
 *         Date: 21 August 2022
 */

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("api/etage")
@Slf4j
public class EtageController {

    @Autowired
    IEtageRepository EtageRepository;

    @PostMapping(value = "save", produces = { "application/json" })
    // @PreAuthorize("hasRole('ROLE_ADMIN')")
    
    public ResponseEntity<Etage> save(@RequestBody Etage Etage,@RequestHeader HttpHeaders  header) {
        log.info("Save Request: ", Etage);

       
       Etage save = EtageRepository.save(Etage);
        return ResponseEntity.ok(save);

    }

    @GetMapping("read/{id}")
    public ResponseEntity<Etage> read(@PathVariable Integer id) {
        log.info("Read Request: ", id);
        Etage Etage = (Etage) this.EtageRepository.read(id);
        return ResponseEntity.ok(Etage);
    }

    @GetMapping("find-all")
    public ResponseEntity<List<Etage>> findAll() {
        List<Etage> EtageLists = this.EtageRepository.findAll();
        return ResponseEntity.ok(EtageLists);
    }

    // @RequestMapping("save")
    // static String hello() {
    // return "hello word";
    // }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        log.info("Delete Req: ", id);
        this.EtageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Etage> update(@PathVariable Integer id,@RequestBody Etage Etage)
    {
        Etage Etage_read=(Etage)this.EtageRepository.read(id);

        Etage_read.setNumero(Etage.getNumero());
      
   Etage Etageupdated= this.EtageRepository.save(Etage_read);
        return ResponseEntity.ok(Etageupdated);
    }

}
