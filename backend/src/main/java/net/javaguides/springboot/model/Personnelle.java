package net.javaguides.springboot.model;

/*
author: Ameer Ismail
student nr: 218216033
domain: Student entity
ADP 3 Assignment Group1
*/

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
  private int id_bur;

  protected Personnelle() {
  }
}