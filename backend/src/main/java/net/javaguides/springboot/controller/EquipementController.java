package net.javaguides.springboot.controller;

import lombok.extern.slf4j.Slf4j;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import net.javaguides.springboot.model.Equipement;
import net.javaguides.springboot.repository.IEquipementRepository; 
import net.javaguides.springboot.factory.EquipementFactory; 

import java.util.List;

/***
 * Equipement.java
 * 
 * @author Elvis Ndlangamandla (213063964)
 *         Date: 21 August 2022
 */

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("api/equipement")
@Slf4j
public class EquipementController {

    private final IEquipementRepository equipementService;

    @Autowired
    public EquipementController(IEquipementRepository equipementService) {
        this.equipementService = equipementService;
    }
    // @CrossOrigin(origins = "http://localhost:4200")

    @PostMapping(value = "save", produces = { "application/json" })
    // @PreAuthorize("hasRole('ROLE_CLIENT')")

    public ResponseEntity<Equipement> save(@RequestBody Equipement equipement) {
        log.info("Save Request: ", equipement);

        Equipement validateEquipement;
        try {
            validateEquipement = EquipementFactory.build(
                    equipement.getSysteme_active(),
                    equipement.getAnne_aquisition(),
                    equipement.getVendeur(),
                    equipement.getBuro(),
                    equipement.getAntivirus_active(),
                    equipement.getModele(),

                    equipement.getReference(),
                    equipement.getType(),
                    equipement.getEtat(),
                    equipement.getSiOrdinateur()

            );
        } catch (IllegalArgumentException i) {
            log.info("Save error: ", i.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Equipement save = equipementService.save(validateEquipement);
        return ResponseEntity.ok(save);

    }

    @GetMapping("read/{id}")
    public ResponseEntity<Equipement> read(@PathVariable Long id) {
        log.info("Read Request: ", id);
        Equipement Equipement = (net.javaguides.springboot.model.Equipement) this.equipementService.read_Id(id);
                // .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(Equipement);
    }

    @GetMapping("find-all")

    public ResponseEntity<List<Equipement>> findAll() {
        List<Equipement> EquipementLists = this.equipementService.findAll();
        return ResponseEntity.ok(EquipementLists);
    }

    // @RequestMapping("save")
    // static String hello() {
    // return "hello word";
    // }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("Delete Req: ", id);
        this.equipementService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Equipement> updateEquipement(@PathVariable Long id,
            @RequestBody Equipement equipementDetails) {
        Equipement equipement = (Equipement) equipementService.read_Id(id);
                // .orElseThrow(() -> new ResourceNotFoundException("Equipement not exist with id :" + id));
        equipement.setSysteme_active(equipementDetails.getSysteme_active());
        equipement.setAnne_aquisition(equipementDetails.getAnne_aquisition());
        equipement.setVendeur(equipementDetails.getVendeur());
        equipement.setBuro(equipementDetails.getBuro());
        equipement.setAntivirus_active(equipementDetails.getAntivirus_active());
        equipement.setModele(equipementDetails.getModele());
        equipement.setReference(equipementDetails.getReference());
        equipement.setType(equipementDetails.getType());
        equipement.setEtat(equipementDetails.getEtat());
        equipement.setSiOrdinateur(equipementDetails.getSiOrdinateur());

        Equipement updatedEquipement = equipementService.save(equipement);
        return ResponseEntity.ok(updatedEquipement);
    }

}
