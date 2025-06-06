package com.Placement.PlacementTracker.controller;

import com.Placement.PlacementTracker.model.StudentApplication;
import com.Placement.PlacementTracker.service.StudentApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/applications")
    public List<StudentApplication> viewAllApplicationsByStudent(@RequestBody String studentName){
        return applicationService.getApplicationsByStudent(studentName);
    }


}
