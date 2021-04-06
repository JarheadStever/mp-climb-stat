package com.jstever.mpclimbstat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;


@Controller
public class IndexController {

    @RequestMapping("/index")
    public ModelAndView index(final HttpServletRequest request) {
        return new ModelAndView("index");
    }
}
