package net.javaguides.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import net.javaguides.springboot.service.UserService;

@EnableAsync
@EnableScheduling

@SpringBootApplication
// (exclude = { SecurityAutoConfiguration.class })
public class SpringbootBackendApplication implements CommandLineRunner {
  public static void main(String[] args) {
    SpringApplication.run(SpringbootBackendApplication.class, args);

    // System.out.println(Arrays.asList(AppUserRole.ROLE_CLIENT) +" deigtt "+new
    // ArrayList<AppUserRole>(Arrays.asList(AppUserRole.ROLE_CLIENT)));
  }

  // @Autowired EmployeeRepository employeeRepository;
  // @Override
  // public void run(String... args) throws Exception {
  // Employee emp=new Employee(1,"deidine","cheigeur","deidine@gmail.com");
  // this.employeeRepository.save(emp);
  // }
  @Autowired
  UserService userService;

  @Override
  public void run(String... params) throws Exception {
    // AppUser admin = new AppUser();
    // admin.setUsername("admin");
    // admin.setPassword("admin");
    // admin.setEmail("admin@email.com");
    // admin.setAppUserRoles(new
    // ArrayList<AppUserRole>(Arrays.asList(AppUserRole.ROLE_ADMIN)));

    // userService.signup(admin);

    // AppUser client = new AppUser();
    // client.setUsername("client");
    // client.setPassword("client");
    // client.setEmail("client@email.com");
    // client.setAppUserRoles(new
    // ArrayList<AppUserRole>(Arrays.asList(AppUserRole.ROLE_CLIENT)));

    // userService.signup(client);
  }

}
