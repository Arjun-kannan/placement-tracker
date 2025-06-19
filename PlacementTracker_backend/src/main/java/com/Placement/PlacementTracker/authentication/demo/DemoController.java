package com.Placement.PlacementTracker.authentication.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/dashboard")
public class DemoController {

    @PreAuthorize("hasAnyRole('ADMIN','STUDENT')")
    @GetMapping("")
    public ResponseEntity<String> adminDashboard(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = "";
        String role = "";

        if(authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails){
            username = authentication.getName();
            role = authentication.getAuthorities().toString();
        }
        if(role.contains("ADMIN"))
            return ResponseEntity.ok("hello admin " + username);
        else if(role.contains("STUDENT"))
            return ResponseEntity.ok("hello student " + username);
        else
            return ResponseEntity.status(403).body("Access denied");
    }
}
