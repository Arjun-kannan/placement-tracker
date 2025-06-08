package com.Placement.PlacementTracker.repository;

import com.Placement.PlacementTracker.model.StudentApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentApplicationRepository extends JpaRepository<StudentApplication, Long> {

    Page<StudentApplication> findByStudentName(String studentName, Pageable pageable);

    @Query(value = "SELECT * from student_application WHERE status = :status AND company_name = :company", nativeQuery = true)
    Page<StudentApplication> findByStatusAndCompany(@Param("status") String status, @Param("company")String company, Pageable pageable);

    Page<StudentApplication> findByStatus(String status, Pageable pageable);

    Page<StudentApplication> findByCompanyName(String companyName, Pageable pageable);
}
