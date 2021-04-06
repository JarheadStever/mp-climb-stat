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
    @JsonProperty("date")
    String getDate();
    // TODO: Jared: 4/2/21 use java.util.Calendar to handle Date field for sorting?
    // probably unnecessary since they can be sorted alphabetically as Strings

    @Nullable
    @JsonProperty("route")
    String getRoute();

    @Nullable
    @JsonProperty("rating")
    String getRating(); // grade

    @Nullable
    @JsonProperty("notes")
    String getNotes();

    @Nullable
    @JsonProperty("url")
    String getUrl();

    @Nullable
    @JsonProperty("pitches")
    Integer getPitches();

    @Nullable
    @JsonProperty("location")
    String getLocation();

    @Nullable
    @JsonProperty("avg-stars")
    Double getAvgStars();

    @Nullable
    @JsonProperty("your-stars")
    Integer getYourStars();

    @Nullable
    @JsonProperty("style")
    String getStyle();

    @Nullable
    @JsonProperty("lead-style")
    String getLeadStyle();

    @Nullable
    @JsonProperty("route-type")
    String getRouteType();

    @Nullable
    @JsonProperty("your-rating")
    String getYourRating();

    @Nullable
    @JsonProperty("length")
    Integer getLength();

    @Nullable
    @JsonProperty("rating-code")
    Integer getRatingCode();
}
