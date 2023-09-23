package net.javaguides.springboot.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
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
import net.javaguides.springboot.model.Buro;
import net.javaguides.springboot.repository.IBuroRepository;
import net.javaguides.springboot.dto.UserResponseDTO;
import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.factory.BuroFactory;

import java.util.List;

/***
 * Buro.java
 * 
 * @author Elvis Ndlangamandla (213063964)
 *         Date: 21 August 2022
 */

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("api/buro")
@Slf4j
public class BuroController {

    @Autowired
    IBuroRepository buroRepository;

    @PostMapping(value = "save", produces = { "application/json" })
    // @PreAuthorize("hasRole('ROLE_ADMIN')")
    
    public ResponseEntity<Buro> save(@RequestBody Buro buro,@RequestHeader HttpHeaders  header) {
        log.info("Save Request: ", buro);

       
       Buro save = buroRepository.save(buro);
        return ResponseEntity.ok(save);

    }

    @GetMapping("read/{id}")
    public ResponseEntity<Buro> read(@PathVariable Integer id) {
        log.info("Read Request: ", id);
        Buro Buro = (Buro) this.buroRepository.read(id);
        return ResponseEntity.ok(Buro);
    }

    @GetMapping("find-all")
    public ResponseEntity<List<Buro>> findAll() {
        List<Buro> BuroLists = this.buroRepository.findAll(Sort.by("id").descending());
        return ResponseEntity.ok(BuroLists);
    }

    // @RequestMapping("save")
    // static String hello() {
    // return "hello word";
    // }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        log.info("Delete Req: ", id);
        this.buroRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Buro> update(@PathVariable Integer id,@RequestBody Buro buro)
    {
        Buro buro_read= this.buroRepository.read(id);

        buro_read.setEntite(buro.getEntite());
        buro_read.setEtage(buro.getEtage());

   Buro Buroupdated= this.buroRepository.save(buro_read);
        return ResponseEntity.ok(Buroupdated);
    }

}
