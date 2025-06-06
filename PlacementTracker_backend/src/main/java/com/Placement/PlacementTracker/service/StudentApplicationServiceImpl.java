package com.Placement.PlacementTracker.service;

import com.Placement.PlacementTracker.model.StudentApplication;
import com.Placement.PlacementTracker.repository.StudentApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentApplicationServiceImpl implements StudentApplicationService{

    @Autowired
    private StudentApplicationRepository applicationRepository;

    @Override
    public StudentApplication apply(StudentApplication application) {
        application.setStatus("pending");
        if(application.getRole() == null)
            application.setRole("Software development");
        return applicationRepository.save(application);
    }

    @Override
    public List<StudentApplication> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public List<StudentApplication> getApplicationsByStudent(String studentName) {
        return applicationRepository.findByStudentName(studentName);
    }

    @Override
    public List<StudentApplication> getApplicationsByCompany(String companyName) {
        return applicationRepository.findByStudentName(companyName);
    }

    @Override
    public StudentApplication updateApplicationStatus(Long id, String status) {
        StudentApplication app = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(status);
        return applicationRepository.save(app);
    }

    @Override
    public List<StudentApplication> getApplicationsByStatus(String status) {
        return applicationRepository.getApplicationByStatus(status);
    }

    @Override
    public List<StudentApplication> getAllApplicationsByStatusAndCompany(String status, String company) {
        return applicationRepository.getAllApplicationsByStatusAndCompany(status, company);
    }
}
