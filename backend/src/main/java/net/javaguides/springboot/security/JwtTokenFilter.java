package net.javaguides.springboot.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import net.javaguides.springboot.exception.CustomException;
import org.springframework.web.filter.OncePerRequestFilter;

// We should use OncePerRequestFilter since we are doing a database call, there is no point in doing this more than once
public class JwtTokenFilter extends GenericFilterBean {

  private JwtTokenProvider jwtTokenProvider;

  public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
    this.jwtTokenProvider = jwtTokenProvider;
  }

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    // TODO Auto-generated method stub
    String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);

    try {
      if (token != null && jwtTokenProvider.validateToken(token)) {
        Authentication auth = jwtTokenProvider.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(auth);
      }
      chain.doFilter(request, response);
      this.resetAuthenticationAfterRequest();

    } catch (CustomException ex) {
      // this is very important, since it guarantees the user is not authenticated at
      // all
      SecurityContextHolder.clearContext();
      ((HttpServletResponse) response).sendError(ex.getHttpStatus().value(), ex.getMessage());

    }
  }


  private void resetAuthenticationAfterRequest() {
    SecurityContextHolder.getContext().setAuthentication(null);
}
}
