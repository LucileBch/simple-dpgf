package com.simpledpgfapi.configuration;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/deployed")
public class ApiController {

    @GetMapping
    public String checkNorthlankEndpoint() {
        return "Hello, welcome on my Java server!";
    }
}
