package com.Placement.PlacementTracker.repository;

import com.Placement.PlacementTracker.model.StudentApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentApplicationRepository extends JpaRepository<StudentApplication, Long> {

    @Query(value = "SELECT * from student_application WHERE studentName = studentName", nativeQuery = true)
    List<StudentApplication> findByStudentName(String studentName);

    @Query(value = "SELECT * from student_application WHERE status = status AND companyName = company", nativeQuery = true)
    List<StudentApplication> getAllApplicationsByStatusAndCompany(String status, String company);

    @Query(value = "SELECT * from student_application WHERE status = status", nativeQuery = true)
    List<StudentApplication> getApplicationByStatus(String status);
}
