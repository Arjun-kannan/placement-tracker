package com.Placement.PlacementTracker.controller;

import com.Placement.PlacementTracker.model.StudentApplication;
import com.Placement.PlacementTracker.service.StudentApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private StudentApplicationService applicationService;

    @GetMapping("/applications")
    public ResponseEntity<Page<StudentApplication>> filterApplications(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String company,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        if (status != null && company != null)
            return new ResponseEntity<>(applicationService.getAllApplicationsByStatusAndCompany(status, company, page, size), HttpStatus.OK);
        else if (status != null)
            return new ResponseEntity<>(applicationService.getApplicationsByStatus(status, page, size), HttpStatus.OK);
        else if (company != null)
            return new ResponseEntity<>(applicationService.getApplicationsByCompany(company, page, size), HttpStatus.OK);
        else
            return new ResponseEntity<>(applicationService.getAllApplications(page, size), HttpStatus.OK);
    }

    @PutMapping("/applications/{id}")
    public ResponseEntity<StudentApplication> updateStatus(@PathVariable Long id,
                                                           @RequestBody Map<String, String> body) {
        return new ResponseEntity<>(applicationService.updateApplicationStatus(id, body.get("status")), HttpStatus.OK);
    }

    @GetMapping("/applications/company/{companyName}")
    public ResponseEntity<Page<StudentApplication>> viewApplicationsByCompany(@PathVariable String companyName,
                                                                              @RequestParam(defaultValue = "0") int page,
                                                                              @RequestParam(defaultValue = "5") int size) {
        return new ResponseEntity<>(applicationService.getApplicationsByCompany(companyName, page, size), HttpStatus.OK);
    }

    @GetMapping("/applications/pending")
    public ResponseEntity<Page<StudentApplication>>  viewPendingApplication(@RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "5") int size) {
        return new ResponseEntity<>(applicationService.getApplicationsByStatus("pending", page, size), HttpStatus.OK);
    }

}
