package net.javaguides.springboot.model;

/*
author: Ameer Ismail
student nr: 218216033
domain: Student entity
ADP 3 Assignment Group1
*/

import lombok.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@Entity
public class Personnelle {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)

  private long id;
  private Long telephone;

  private String nom, role_systm, fn_dans_entite;

  @Column(unique = true)
  String Email;
  @ManyToOne(cascade = CascadeType.ALL)
 @OnDelete(action = OnDeleteAction.CASCADE)
 
  private Buro buro;

  protected Personnelle() {
  }
}