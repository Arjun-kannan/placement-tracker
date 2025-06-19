package com.Placement.PlacementTracker.service;

import com.Placement.PlacementTracker.model.StudentApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StudentApplicationService {
    StudentApplication apply(StudentApplication application);
    Page<StudentApplication> getAllApplications(int page, int size);
    Page<StudentApplication> getApplicationsByStudent(String studentName, int page, int size);
    Page<StudentApplication> getApplicationsByCompany(String companyName, int page, int size);
    StudentApplication updateApplicationStatus(Long id, String status);
    Page<StudentApplication> getApplicationsByStatus(String status, int page, int size);
    Page<StudentApplication> getAllApplicationsByStatusAndCompany(String status, String company, int page, int size);
}
