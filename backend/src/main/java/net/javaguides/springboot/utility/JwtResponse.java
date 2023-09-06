package net.javaguides.springboot.utility;

import java.util.List;

import net.javaguides.springboot.model.AppUserRole;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Integer id;
	private String username;
	private String email;
	private List<AppUserRole> roles;
	private String password;
	public JwtResponse(String accessToken, Integer id, String username, String password, String email,
			List<AppUserRole> roles) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Integer getId() {
		return id;
	}

	public Integer getPassword() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setPassword(String password) {
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<AppUserRole> getRoles() {
		return roles;
	}
}
