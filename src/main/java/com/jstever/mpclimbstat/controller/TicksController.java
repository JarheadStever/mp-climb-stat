package com.jstever.mpclimbstat.controller;

import com.jstever.mpclimbstat.datasource.MtnProjectDataSource;
import com.jstever.mpclimbstat.model.Tick;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class TicksController {

    private MtnProjectDataSource dataSource;

    public TicksController() {
        this.dataSource = new MtnProjectDataSource();
    }

    @GetMapping("/ticks")
    @ResponseBody
    public List<Tick> getTicks() {
        return dataSource.getTicks();
    }

}
