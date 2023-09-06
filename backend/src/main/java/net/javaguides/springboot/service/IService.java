package net.javaguides.springboot.service;

import java.util.List;
import java.util.Optional;

/**
 * @author Mbuso Kotobe (218040385)
 * IService
 * Date: 09 August 2022
 * */
public interface IService <T, I> {
    T save(T object);
    Optional<T> read(I id);
    void delete(T object);
    List<T> findAll();
}
