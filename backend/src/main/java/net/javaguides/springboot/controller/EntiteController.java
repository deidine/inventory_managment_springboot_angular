package net.javaguides.springboot.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import net.javaguides.springboot.model.City;
import net.javaguides.springboot.model.City2;
import net.javaguides.springboot.model.Entite;
import net.javaguides.springboot.repository.IEntiteRepository;
import net.javaguides.springboot.factory.EntiteFactory;
import net.javaguides.springboot.service.IEntiteService;

import java.util.Arrays;
import java.util.List;

/***
 * EntiteControllerTest.java
 * Controller for Entite
 * 
 * @author Mbuso Kotobe (218040385)
 *         Date: 21 August 2022
 */
@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("api/entite")
public class EntiteController {

    private final IEntiteService service;
    @Autowired
    IEntiteRepository entiterepository;

    @Autowired
    public EntiteController(IEntiteService service) {
        this.service = service;
    }

    @PostMapping("save")
    public ResponseEntity<Entite> save(@RequestBody Entite entite, @RequestHeader HttpHeaders header) {
        Entite entiteReturned = null;
        try {
            entiteReturned = entiterepository.save(EntiteFactory.build(
                    entite.getMougattaa(), entite.getWilayas(), entite.getAffectation(),
                    entite.getType(),
                    entite.getDepartments(),
                    entite.getEntiteName()));
        } catch (IllegalArgumentException exception) {
            log.info("Entite Save: {}", exception);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(entiteReturned);
    }

    @GetMapping("read/{EntiteId}")
    public ResponseEntity<Entite> read(@PathVariable Integer EntiteId) {
        Entite EntiteReturned = entiterepository.read_Id(EntiteId);
                // .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return  ResponseEntity.ok(EntiteReturned);
    }

    @GetMapping("find-all")
    public ResponseEntity<List<Entite>> findAll() {
        return ResponseEntity.ok(entiterepository.findAll());
    }

    @DeleteMapping("delete/{EntiteId}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer EntiteId) {
        service.deleteById(EntiteId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("delete")
    public ResponseEntity<Void> delete(@RequestBody Entite Entite) {
        entiterepository.delete(Entite);
        return ResponseEntity.noContent().build();
    }
	@GetMapping("/cities")
	public ResponseEntity<List<City>> getAllCities() {
 		return ResponseEntity.ok(Arrays.asList(City.values()));
	}
    	@GetMapping("/mougatta")
	public ResponseEntity<List<City2>> getAllMougatta() {
 		return ResponseEntity.ok(Arrays.asList(City2.values()));
	}
}
