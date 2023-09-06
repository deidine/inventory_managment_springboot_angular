package net.javaguides.springboot.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import net.javaguides.springboot.model.Personnelle;
import net.javaguides.springboot.factory.PersonnelleFactory;
import net.javaguides.springboot.service.IPersonnelleService;

import java.util.List;

/***
 * Personnelle.java
 * 
 * @author Elvis Ndlangamandla (213063964)
 *         Date: 21 August 2022
 */

@RestController
@CrossOrigin(origins = "*")

@RequestMapping("api/personnelle")
@Slf4j
public class PersonnelleController {

    private final IPersonnelleService personnelleService;

    @Autowired
    public PersonnelleController(IPersonnelleService personnelleService) {
        this.personnelleService = personnelleService;
    }

    @PostMapping("save")
    public ResponseEntity<Personnelle> save(@RequestBody Personnelle personnelle) {
        log.info("Save Request: ", personnelle);

        Personnelle ValidatePersonnelle;
        try {
            ValidatePersonnelle = PersonnelleFactory.createPersonnelle(personnelle.getEmail(),
                    personnelle.getFn_dans_entite(), personnelle.getId_bur(),
                     personnelle.getNom(),
                    personnelle.getRole_systm(), personnelle.getTelephone()
            // ,Personnelle.getFaculty()
            );
        } catch (IllegalArgumentException i) {
            log.info("Save error: ", i.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Personnelle save = personnelleService.save(ValidatePersonnelle);
        return ResponseEntity.ok(save);

    }

    // @GetMapping("read/{id}")
    // public ResponseEntity<Personnelle> read(@PathVariable String id) {
    // log.info("Read Request: ", id);
    // Personnelle Personnelle = this.personnelleService.read(id)
    // .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    // return ResponseEntity.ok(Personnelle);
    // }

    @GetMapping("find-all")
    // @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<Personnelle>> findAll() {
        List<Personnelle> personnelleLists = this.personnelleService.findAll();
        return ResponseEntity.ok(personnelleLists);
    }

    @RequestMapping("/hello")
    // @CrossOrigin(origins = "http://localhost:8080")
    static String hello() {
        return "hello word";
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        log.info("Delete Req: ", id);
        this.personnelleService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
