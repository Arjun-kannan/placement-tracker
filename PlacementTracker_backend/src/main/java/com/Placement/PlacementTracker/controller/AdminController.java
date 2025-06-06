package com.Placement.PlacementTracker.controller;

import com.Placement.PlacementTracker.model.StudentApplication;
import com.Placement.PlacementTracker.service.StudentApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private StudentApplicationService applicationService;

    @GetMapping("/applications")
    public List<StudentApplication> filterApplications(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String company
    ){
        if(status != null && company != null)
            return applicationService.getAllApplicationsByStatusAndCompany(status, company);
        else if(status != null)
            return applicationService.getApplicationsByStatus(status);
        else if(company != null)
            return applicationService.getApplicationsByCompany(company);
        else
            return applicationService.getAllApplications();
    }

    @PutMapping("/applications/{id}")
    public ResponseEntity<StudentApplication> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body){
        return new ResponseEntity<>(applicationService.updateApplicationStatus(id, body.get("status")), HttpStatus.OK);
    }

    @GetMapping("/applications/company/{companyName}")
    public List<StudentApplication> viewApplicationsByCompany(@PathVariable String companyName){
        return applicationService.getApplicationsByCompany(companyName);
    }

    @GetMapping("/applications/pending")
    public List<StudentApplication> viewPendingApplication(){
        return applicationService.getApplicationsByStatus("pending");
    }

}
