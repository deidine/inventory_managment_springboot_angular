package net.javaguides.springboot.model;

import lombok.*;

import javax.persistence.*;
 
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
@EqualsAndHashCode
@Entity
public class Entite {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private long entiteId;

    private String entiteName;

    private String affectation, Wilayas, type, Mougattaa;

    // @ManyToOne
    // private Department department;

    protected Entite() {
    }
}
