package net.javaguides.springboot.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;

@Entity
@Data // Create getters and setters
@NoArgsConstructor
public class AppUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Size(min = 4, max = 255, message = "Minimum username length: 4 characters")
  @Column(unique = true, nullable = false)
  private String username;

  @Column(unique = true, nullable = false)
  private String email;

  @Size(min = 8, message = "Minimum password length: 8 characters")
  private String password;

  @ElementCollection(fetch = FetchType.EAGER)
  @Column(name = "role_name", nullable = false)
@Enumerated(EnumType.STRING)//this for creating string in data base
    //  @CollectionTable(name = "roles", 
    //        joinColumns = @JoinColumn(name="roles_id"))
   
  List<AppUserRole> appUserRoles;

  @Override
  public String toString() {
    return String.format(
"{\"id\":\"%s\",\"username\":\"%s\",\"email\":\"%s\",\"password\":\"%s\",\"appUserRoles\":\"%s\"}",
        id, username, email, password, appUserRoles);
  }
}