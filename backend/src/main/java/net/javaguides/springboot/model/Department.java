package net.javaguides.springboot.model;
 
import lombok.*;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.mapping.List;

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
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "department_url")
    private String departmentUrl;
    @Column(name = "department_titre")
    private String departmentTitre;

  
    // @OneToMany(mappedBy = "department", cascade = CascadeType.REMOVE)
    // private Set<Entite> entites;

    public Department() {
        // entites = new HashSet<>();
    }

}

