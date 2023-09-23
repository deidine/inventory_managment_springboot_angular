package net.javaguides.springboot.model;

import lombok.*;

import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.mapping.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import net.javaguides.springboot.model.Etage;

/***
 * Department.java
 * 
 * @author Elvis Ndlangamandla (213063964)
 *         Date: 21 August 2022
 */

@Setter
@AllArgsConstructor
// @NoArgsConstructor
@Builder
@Getter
@EqualsAndHashCode
@Entity
// @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class,
// property="departmentId")
// @JsonIgnoreProperties(ignoreUnknown = true,allowSetters = true)

public class Buro {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  @Column(name = "numero", unique = true)
  private int numero;
  // @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE,optional = true)
  // @JsonIgnore
  // @JsonManagedReference
  @ManyToOne // (cascade = CascadeType.ALL,optional = true)
  // @JoinColumn(name = "id")
  private Etage etage;
  // @OneToOne(mappedBy ="buro",fetch = FetchType.EAGER,cascade =
  // CascadeType.MERGE,optional = true)
  // @JoinColumn(name = "id")
  // @JsonIgnore
  // @JsonManagedReference
  @ManyToOne  (cascade = CascadeType.MERGE  )
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Entite entite;

  @JsonIgnore
  @OneToMany(mappedBy = "buro", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)

  private Set<Personnelle> personnelles;


  @JsonIgnore
  @OneToMany(mappedBy = "buro", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)

  private Set<Equipement> equipements;

  public Buro() {
    // entites = new HashSet<>();
  }

}
