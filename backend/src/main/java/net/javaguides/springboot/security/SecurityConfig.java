// package net.javaguides.springboot.security;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig extends WebSecurityConfigurerAdapter {

//     @Override
//     protected void configure(HttpSecurity security) throws Exception
//     {
//      security.httpBasic().disable();
//      security.authorizeRequests().antMatchers(HttpMethod.POST, "/employees/*").permitAll();
//      security.csrf().disable();

//     }
//     //  @Bean
//     // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
//     // {
//     //     http.httpBasic()
//     //         .and().csrf().disable().formLogin().disable()
//     //         //URL Path Matchers for the Faculty Domain.
//     //         .authorizeRequests()
//     //         .antMatchers(HttpMethod.POST, "/employees/*").permitAll()
//     //              .and()
//     //         .cors()
//     //         .and()
//     //         .sessionManagement()
//     //         .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//     //     return http.build();
//     // }
// }