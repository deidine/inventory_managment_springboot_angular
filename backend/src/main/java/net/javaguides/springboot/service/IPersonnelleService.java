package net.javaguides.springboot.service;

/*
author: Ameer Ismail
student nr: 218216033
Service interface: IStudentService
ADP 3 Assignment Group1
Service implementation
*/

import net.javaguides.springboot.model.Personnelle;
import net.javaguides.springboot.service.IService;

public interface IPersonnelleService extends IService<Personnelle, Long>
{
    void deleteById(String id);
}
