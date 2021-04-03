package com.jstever.mpclimbstat.datasource;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.jstever.mpclimbstat.model.Tick;
// TODO: Jared: 4/2/21 remove logger imports
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class MtnProjectDataSource {

    public List<Tick> getTicks() {

        List<Tick> ticks = new ArrayList<Tick>();

        try {

            InputStream input = new URL(
                    "https://www.mountainproject.com/user/200273632/jared-stever/tick-export").openStream();
            List<String> csvLines = new BufferedReader(
                    new InputStreamReader(input, StandardCharsets.UTF_8)).lines().collect(Collectors.toList());
            String content = new String(String.join("\n", csvLines).getBytes());
            CsvSchema csvSchema = CsvSchema.emptySchema().withHeader();
            MappingIterator<Tick> iterator = new CsvMapper().readerFor(Tick.class).with(csvSchema).readValues(content);
            while (iterator.hasNextValue()) {
                ticks.add(iterator.nextValue());
            }

        } catch(IOException e) {
            // TODO: Jared: 4/1/21 Throw Exceptions back later if necessary in user lookup
            return null;
        }

        return ticks;
    }

}
