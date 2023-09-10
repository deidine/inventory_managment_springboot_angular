package net.javaguides.springboot.service;

import javax.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import net.javaguides.springboot.exception.CustomException;
import net.javaguides.springboot.model.AppUser;
import net.javaguides.springboot.repository.UserRepository;
import net.javaguides.springboot.security.JwtTokenProvider;
import net.javaguides.springboot.utility.JwtResponse;
import net.javaguides.springboot.utility.MessageResponse;

@Service
@RequiredArgsConstructor
public class UserService {

  @Autowired
  UserRepository userRepository;
  @Autowired
  PasswordEncoder passwordEncoder;
  @Autowired
  JwtTokenProvider jwtTokenProvider;
  @Autowired
  AuthenticationManager authenticationManager;

  public ResponseEntity<?> signin(String username, String password) {
    try {
      Authentication authentication = authenticationManager
          .authenticate(new UsernamePasswordAuthenticationToken(username, password));
      AppUser user = userRepository.findByUsername(username);
      System.out.println(user);
      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtTokenProvider.createToken(username,
          userRepository.findByUsername(username).getAppUserRoles());
      return ResponseEntity.ok(new JwtResponse(jwt,
          user.getId(),
          username,
          password,
          user.getEmail(),
          user.getAppUserRoles()));

    } catch (AuthenticationException e) {
      throw new CustomException("Invalid username/password supplied " + password + " " + username,
          HttpStatus.UNPROCESSABLE_ENTITY);

    }
  }

  public ResponseEntity<JwtResponse> signup(AppUser appUser) {
    if (!userRepository.existsByUsername(appUser.getUsername())) {
      appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
      userRepository.save(appUser);
 System.out.println(ResponseEntity.ok(jwtTokenProvider.createToken(appUser.getUsername(),
      appUser.getAppUserRoles())));
      // return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
      // return  ResponseEntity.ok(jwtTokenProvider.createToken(appUser.getUsername(),
      // appUser.getAppUserRoles()));
     Authentication authentication = authenticationManager
          .authenticate(new UsernamePasswordAuthenticationToken(appUser.getUsername(), appUser.getPassword()));
      AppUser user = userRepository.findByUsername(appUser.getUsername());
      System.out.println(user);
      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtTokenProvider.createToken(appUser.getUsername(),
          userRepository.findByUsername(appUser.getUsername()).getAppUserRoles());
      return ResponseEntity.ok(new JwtResponse(jwt,
          user.getId(),
          appUser.getUsername(),
          appUser.getPassword(),
           appUser.getEmail(),
          appUser.getAppUserRoles()));

    } else {
       throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY) ;
      // return ResponseEntity.ok(new MessageResponse("Username is already in use!"
      //     + new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY)));
    } 
  }

  public void delete(String username) {
    userRepository.deleteByUsername(username);
  }

  public AppUser search(String username) {
    AppUser appUser = userRepository.findByUsername(username);
    if (appUser == null) {
      throw new CustomException("The user doesn't exist", HttpStatus.NOT_FOUND);
    }
    return appUser;
  }

  public AppUser whoami(HttpServletRequest req) {
    return userRepository.findByUsername(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(req)));
  }

  public String refresh(String username) {
    return jwtTokenProvider.createToken(username, userRepository.findByUsername(username).getAppUserRoles());
  }

}
