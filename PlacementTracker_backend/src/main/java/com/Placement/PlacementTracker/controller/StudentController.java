package com.Placement.PlacementTracker.controller;

import com.Placement.PlacementTracker.model.StudentApplication;
import com.Placement.PlacementTracker.service.StudentApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentApplicationService applicationService;

    @PostMapping("/apply")
    public StudentApplication addApplication(@RequestBody StudentApplication application){
        System.out.println(application);
        return applicationService.apply(application);
    }

    @GetMapping("/applications/{studentName}")
    public ResponseEntity<Page<StudentApplication>> viewAllApplicationsByStudent(
            @PathVariable String studentName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size){
        return new ResponseEntity<>(applicationService.getApplicationsByStudent(studentName, page, size), HttpStatus.OK);
    }


}
