package net.javaguides.springboot.model;

import lombok.*;

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

public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int departmentId;
    @Column(name = "department_name")
    private String departmentName;
    @Column(name = "department_url")
    private String departmentUrl;
    @Column(name = "department_titre")
    private String departmentTitre;
    // @OneToMany(mappedBy = "department", cascade = CascadeType.REMOVE)
    // @ManyToOne
    // @JsonIgnore
    // @JsonManagedReference
    @ManyToOne(cascade = CascadeType.MERGE)
    @OnDelete(action = OnDeleteAction.CASCADE)

    private Entite entite;

    public Department() {
        // entites = new HashSet<>();
    }

}
