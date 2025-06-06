package com.Placement.PlacementTracker.service;

import com.Placement.PlacementTracker.model.StudentApplication;

import java.util.List;

public interface StudentApplicationService {
    StudentApplication apply(StudentApplication application);
    List<StudentApplication> getAllApplications();
    List<StudentApplication> getApplicationsByStudent(String studentName);
    List<StudentApplication> getApplicationsByCompany(String companyName);
    StudentApplication updateApplicationStatus(Long id, String status);
    List<StudentApplication> getApplicationsByStatus(String status);
    List<StudentApplication> getAllApplicationsByStatusAndCompany(String status, String company);
}
