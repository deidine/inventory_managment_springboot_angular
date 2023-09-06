package net.javaguides.springboot.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import net.javaguides.springboot.model.Entite;
import net.javaguides.springboot.factory.EntiteFactory;
import net.javaguides.springboot.service.IEntiteService;

import java.util.List;

/***
 * EntiteControllerTest.java
 * Controller for Entite
 * @author Mbuso Kotobe (218040385)
 * Date: 21 August 2022
 */
@Slf4j
@RestController
@RequestMapping("Entite/")
public class EntiteController {

    private final IEntiteService service;

    @Autowired
    public EntiteController (IEntiteService service)
    {
        this.service = service;
    }
    @PostMapping("save")
    public ResponseEntity<Entite> save(@RequestBody Entite Entite)
    {
        Entite EntiteReturned = null;
        try{
            EntiteReturned = service.save(EntiteFactory.build(
                Entite.getEntiteId(),
                Entite.getEntiteName(),
                null, null
                // , Entite.getDepartment()
            ));
        }
        catch(IllegalArgumentException exception)
        {
            log.info("Entite Save: {}", exception);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(EntiteReturned);
    }

    @GetMapping("read/{EntiteId}")
    public ResponseEntity<Entite> read(@PathVariable long EntiteId)
    {
        Entite EntiteReturned = service.read(EntiteId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(EntiteReturned);
    }

    @GetMapping("find-all")
    public ResponseEntity<List<Entite>> findAll()
    {
        return ResponseEntity.ok(service.findAll());
    }

    @DeleteMapping("delete/{EntiteId}")
    public ResponseEntity<Void> deleteById(@PathVariable long EntiteId)
    {
        service.deleteById(EntiteId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("delete")
    public ResponseEntity<Void> delete(@RequestBody Entite Entite)
    {
        service.delete(Entite);
        return ResponseEntity.noContent().build();
    }
}
