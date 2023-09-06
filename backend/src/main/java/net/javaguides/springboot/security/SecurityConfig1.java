// package net.javaguides.springboot.security;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;

// @EnableWebSecurity
// @Configuration
// @EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
// public class SecurityConfig1 extends WebSecurityConfigurerAdapter {

//         @Bean
//         public static BCryptPasswordEncoder bCryptPasswordEncoder() {
//                 return new BCryptPasswordEncoder();
//         }
 
//         @Override
//         protected void configure(HttpSecurity http) throws Exception {
//                 http.httpBasic()
//                                 .and().csrf().disable().formLogin().disable()
//                                 // URL Path Matchers for the Faculty Domain.
//                                 .authorizeRequests()
//                                 // .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//                                 .antMatchers(HttpMethod.POST, "/**/faculty/save").hasRole("FACULTY-ADMIN")
//                                 .antMatchers(HttpMethod.DELETE, "/**/faculty/delete").hasRole("FACULTY-ADMIN")
//                                 .antMatchers(HttpMethod.DELETE, "/**/faculty/delete/{facultyId}").hasRole("ADMIN")
//                                 .antMatchers(HttpMethod.GET, "/**/faculty/read").hasAnyRole("USER", "FACULTY-ADMIN")
//                                 .antMatchers(HttpMethod.GET, "/**/faculty/find-all").hasAnyRole("USER", "FACULTY-ADMIN")
//                                  // URL Path Matchers for the Login Domain EndPoint
//                                 .antMatchers(HttpMethod.POST, "/**/department/save").hasRole("DEPARTMENT-ADMIN")
//                                 .antMatchers(HttpMethod.DELETE, "/**/department/delete").hasRole("DEPARTMENT-ADMIN")
//                                 .antMatchers(HttpMethod.DELETE, "/**/department/delete/{departmentId}")
//                                 .hasRole("DEPARTMENT-ADMIN")
//                                 .antMatchers(HttpMethod.GET, "/**/department/read")
//                                 .hasAnyRole("USER", "DEPARTMENT-ADMIN")
//                                 .antMatchers(HttpMethod.GET, "/**/department/find-all")
//                                 .permitAll()


//                                 // users
//                                 .antMatchers(HttpMethod.POST, "/**/user/login").anonymous()
//                                 .antMatchers(HttpMethod.DELETE, "/**/user/signup").anonymous()
//                                 .antMatchers(HttpMethod.DELETE, "/**/user/delete/{departmentId}")
//                                 .permitAll()

//                                 .antMatchers(HttpMethod.GET, "/**/user/users")
//                                 .permitAll()
//                                 .anyRequest()
//                                 .authenticated()
//                                 // .hasAnyRole("USER", "DEPARTMENT-ADMIN")
//                                 .and()
//                                 .cors()
//                                 .and()
//                                 .httpBasic()
//                                 .and()
//                                 .sessionManagement()
//                                 .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//                 // return http.build();
//         }
// }
