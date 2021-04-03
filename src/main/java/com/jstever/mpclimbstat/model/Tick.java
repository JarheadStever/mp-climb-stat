package com.jstever.mpclimbstat.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;
import org.springframework.lang.Nullable;

@JsonSerialize(as = ImmutableTick.class)
@JsonDeserialize(as = ImmutableTick.class)
@Value.Immutable
public interface Tick {

    @Nullable
    @JsonProperty("Date")
    String getDate();
    // TODO: Jared: 4/2/21 use java.util.Calendar to handle Date field for sorting?
    // probably unnecessary since they can be sorted alphabetically as Strings

    @Nullable
    @JsonProperty("Route")
    String getRoute();

    @Nullable
    @JsonProperty("Rating")
    String getRating(); // grade

    @Nullable
    @JsonProperty("Notes")
    String getNotes();

    @Nullable
    @JsonProperty("URL")
    String getUrl();

    @Nullable
    @JsonProperty("Pitches")
    Integer getPitches();

    @Nullable
    @JsonProperty("Location")
    String getLocation();

    @Nullable
    @JsonProperty("Avg Stars")
    Double getAvgStars();

    @Nullable
    @JsonProperty("Your Stars")
    Integer getYourStars();

    @Nullable
    @JsonProperty("Style")
    String getStyle();

    @Nullable
    @JsonProperty("Lead Style")
    String getLeadStyle();

    @Nullable
    @JsonProperty("Route Type")
    String getRouteType();

    @Nullable
    @JsonProperty("Your Rating")
    String getYourRating();

    @Nullable
    @JsonProperty("Length")
    Integer getLength();

    @Nullable
    @JsonProperty("Rating Code")
    Integer getRatingCode();
}
