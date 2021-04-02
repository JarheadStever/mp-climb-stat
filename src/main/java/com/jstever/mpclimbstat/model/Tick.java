package com.jstever.mpclimbstat.model;


import org.immutables.value.Value;
import org.springframework.lang.Nullable;

@Value.Immutable
public interface Tick {

    @Nullable
    String getDate();
    @Nullable
    String getRoute();
    @Nullable
    String getRating(); // grade
    @Nullable
    String getNotes();
    @Nullable
    String getUrl();
    @Nullable
    Integer getPitches();
    @Nullable
    String getLocation();
    @Nullable
    Double getAvgStars();
    @Nullable
    Integer getYourStars();
    @Nullable
    String getStyle();
    @Nullable
    String getLeadStyle();
    @Nullable
    String getRouteType();
    @Nullable
    String getYourRating();
    @Nullable
    Integer getLength();
    @Nullable
    Integer getRatingCode();
}

