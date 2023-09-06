package net.javaguides.springboot.factory;

import net.javaguides.springboot.model.Department;
// import net.javaguides.springboot.entity.Faculty;

/***
 * DepartmentFactory.java
 * @author Elvis Ndlangamandla (213063964)
 * Date: 21 August 2022
 */
public class DepartmentFactory
{
    public static Department build(String departmentName, String departmentUrl, String departmentTitre/*, Faculty faculty */)
    {
        return Department.builder().departmentName(departmentName)
                                   .departmentUrl(departmentUrl)
                                   .departmentTitre(departmentTitre)
                                //    .faculty(faculty)
                                   .build();
    }
}