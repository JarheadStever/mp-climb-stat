package com.jstever.mpclimbstat.datasource;

// https://www.mountainproject.com/user/200273632/jared-stever/ticks
// https://www.mountainproject.com/user/200273632/jared-stever/tick-export

import com.jstever.mpclimbstat.model.ImmutableTick;
import com.jstever.mpclimbstat.model.Tick;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;



public class MtnProjectDataSource {

    private static Integer parseInt(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private static Double parseDouble(String value) {
        try {
            return Double.parseDouble(value);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public List<Tick> getTicks() {

        // TODO: Jared: 4/1/21 Throw Exceptions back later if necessary in user lookup
        List<CSVRecord> rows;
        try {
            InputStream input = new URL("https://www.mountainproject.com/user/200273632/jared-stever/tick-export").openStream();
            InputStreamReader reader = new InputStreamReader(input);
            CSVParser parser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader());
            rows = parser.getRecords();
        } catch(IOException e) {
            return null;
        }

        List<Tick> ticks = new ArrayList<Tick>();

        for (CSVRecord row : rows) {
            // TODO: Jared: 4/2/21 Move to Tick class
            Tick tick = ImmutableTick.builder()
                    .date(row.get("Date"))
                    .route(row.get("Route"))
                    .rating(row.get("Rating"))
                    .notes(row.get("Notes"))
                    .url(row.get("URL"))
                    .pitches(parseInt(row.get("Pitches")))
                    .location(row.get("Location"))
                    .avgStars(parseDouble(row.get("Avg Stars")))
                    .yourStars(parseInt(row.get("Your Stars")))
                    .style(row.get("Style"))
                    .leadStyle(row.get("Lead Style"))
                    .routeType(row.get("Route Type"))
                    .yourRating(row.get("Your Rating"))
                    .length(parseInt(row.get("Length")))
                    .ratingCode(parseInt(row.get("Rating Code")))
                    .build();
            ticks.add(tick);
        }

        return ticks;
    }

}
