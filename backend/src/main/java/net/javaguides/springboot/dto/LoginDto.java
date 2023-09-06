package net.javaguides.springboot.dto;
 
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class LoginDto {
  
  @ApiModelProperty(position = 0)
  private String username; 
  @ApiModelProperty(position = 1)
  private String password; 

}
