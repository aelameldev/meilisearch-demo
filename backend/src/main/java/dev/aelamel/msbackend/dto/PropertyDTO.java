package dev.aelamel.msbackend.dto;

import java.util.Map;

public record PropertyDTO(
    String id,
    String title,
    Float price,
    String currency,
    int rooms,
    int bathrooms,
    Double area,
    String type,
    Map<String, String> _geo
    ) {}
