package net.javaguides.springboot.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.google.common.collect.Table.Cell;

/***
 * entite.java
 * Entity for the entite
 * Author: Mbuso Kotobe (218040385)
 * Date: 06 April 2022
 */
@Getter
@Setter
@AllArgsConstructor

@Builder
// @EqualsAndHashCode
@Entity

// @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class,
// property="entiteId")
// @JsonIgnoreProperties(ignoreUnknown = true,allowSetters = true)

public class Entite implements Serializable {
    static final long serialVersionUID = 3L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int entiteId;
      @NotNull
    @Size(max = 100)
    private String entiteName;
    @NotNull
    @Size(max = 100)
    private String affectation, Wilayas, type, Mougattaa;
    // @JsonBackReference
    // @OnDelete(action = OnDeleteAction.CASCADE)
    @OneToMany(mappedBy = "entite", fetch = FetchType.LAZY,cascade = CascadeType.ALL)// cascade = CascadeType.MERGE)
    @JsonIgnore
     // @JoinTable(name = "dep_ent_TABLE",
    // joinColumns = @JoinColumn(name = "entite_id"),
    // inverseJoinColumns = @JoinColumn(name = "department_id")
    // )
    // ( cascade = CascadeType.REMOVE)
    private Set<Department> departments;

    // private Department department;
    protected Entite() {
        departments = new HashSet<>();
    }
}
