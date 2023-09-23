package net.javaguides.springboot.model;

import lombok.*;

import javax.persistence.*;
 
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Set;

import net.javaguides.springboot.model.Buro;
@Setter
@AllArgsConstructor
@Builder
@Getter
@EqualsAndHashCode
@Entity
// @JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class,
// property="departmentId")
// @JsonIgnoreProperties(ignoreUnknown = true,allowSetters = true)

public class Etage  implements Serializable {
    static final long serialVersionUID = 3L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id_etage;
    @Column(name = "numero", unique = true)
    private int numero;
    // @JsonIgnore
    // @OneToOne(optional = true)
    // @JoinColumn(name = "id_etage") // , unique=true, nullable=false, updatable=false)

	@JsonIgnore
	@OneToMany(mappedBy = "etage", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)

  private   Set<Buro> buro;

    public Etage() {
        // entites = new HashSet<>();
    }

}
