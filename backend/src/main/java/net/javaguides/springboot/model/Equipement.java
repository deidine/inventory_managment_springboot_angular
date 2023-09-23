package net.javaguides.springboot.model;

import lombok.*;
import net.javaguides.springboot.model.Buro;
import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.mapping.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

/***
 * Department.java
 * 
 * @author Elvis Ndlangamandla (213063964)
 *         Date: 21 August 2022
 */

@Setter
@AllArgsConstructor
@Builder
@Getter
@EqualsAndHashCode
@Entity
// @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class,
// property="departmentId")
// @JsonIgnoreProperties(ignoreUnknown = true,allowSetters = true)

public class Equipement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    @Column(name = "Type")
    private String Type;
// private LocalDateTime Anne_aquisition;


    private String Anne_aquisition;
    private String Etat; 
    private String SiOrdinateur;
    private String Systeme_active;
    private String Antivirus_active;
    private String Reference;
    private String Modele;
    private String Vendeur;

    // @OneToOne
    // ( 
    //     //  mappedBy = "post",
    // orphanRemoval = true, fetch = FetchType.LAZY,
    // cascade = CascadeType.ALL )
    //   @JoinColumn(name = "id")
//   @JsonIgnore
// @ManyToOne //(cascade = CascadeType.ALL,optional = true) 
      @ManyToOne(cascade = CascadeType.MERGE)
     @OnDelete(action = OnDeleteAction.CASCADE)
       private Buro buro;

    public Equipement() {
        // entites = new HashSet<>();
    }

}
