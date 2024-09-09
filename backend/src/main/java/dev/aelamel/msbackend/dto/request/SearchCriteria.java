package dev.aelamel.msbackend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SearchCriteria {
  private String query;
  private String type;
  private Float[] location;
  private Float radius;
  private int minRooms;
  private int maxRooms;
  private Float minArea;
  private Float maxArea;
  private Float minPrice;
  private Float maxPrice;
  private Float[][] geoBounds;
}
