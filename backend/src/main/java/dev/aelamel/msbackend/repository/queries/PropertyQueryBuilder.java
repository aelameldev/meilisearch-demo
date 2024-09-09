package dev.aelamel.msbackend.repository.queries;

import com.meilisearch.sdk.SearchRequest;
import dev.aelamel.msbackend.dto.request.SearchCriteria;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class PropertyQueryBuilder {

  private PropertyQueryBuilder() {
  }

  public static SearchRequest buildQuery(SearchCriteria criteria, int page, int size) {

    return SearchRequest.builder()
        .q(criteria.getQuery())
        .page(page + 1)
        .offset(size * page)
        .filter(buildFilters(criteria))
        .build();
  }


  private static String[] buildFilters(SearchCriteria criteria) {
    List<String> filters = new ArrayList<>();
    propertyTypeFilter(criteria, filters);
    roomsFilter(criteria, filters);
    areaFilter(criteria, filters);
    priceFilter(criteria, filters);
    geoFilter(criteria, filters);

    return filters.toArray(new String[0]);
  }

  private static void priceFilter(SearchCriteria criteria, List<String> filters) {
    if (criteria.getMinPrice() != null) {
      filters.add("price > " + criteria.getMinPrice());
    }

    if (criteria.getMaxPrice() != null) {
      filters.add("price < " + criteria.getMaxPrice());
    }
  }

  private static void geoFilter(SearchCriteria criteria, List<String> filters) {
    if (criteria.getLocation() != null && criteria.getLocation().length == 2
        && criteria.getRadius() != null) {
      filters.add(String.format("_geoRadius(%f, %f, %f)", criteria.getLocation()[0],
          criteria.getLocation()[1], criteria.getRadius()));

      return;
    }

    if (criteria.getGeoBounds() != null) {
      filters.add("_geoBoundingBox(" + Arrays.stream(criteria.getGeoBounds())
          .map(bound -> String.format("[%f, %f]", bound[0], bound[1])).collect(Collectors.joining(",")) + ")");
    }
  }

  private static void areaFilter(SearchCriteria criteria, List<String> filters) {
    if (criteria.getMinArea() != null) {
      filters.add("area >= " + criteria.getMinArea());
    }

    if (criteria.getMinArea() != null && criteria.getMaxArea() != null && criteria.getMaxArea() >= criteria.getMinArea()){
      filters.add("area <= " + criteria.getMaxArea());
    }
  }

  private static void roomsFilter(SearchCriteria criteria, List<String> filters) {
    if (criteria.getMinRooms() > 0) {
      filters.add("rooms >= " + criteria.getMinRooms());
    }

    if (criteria.getMaxRooms() > 0 && criteria.getMaxRooms() >= criteria.getMinRooms()){
      filters.add("rooms <= " + criteria.getMaxRooms());
    }
  }

  private static void propertyTypeFilter(SearchCriteria criteria, List<String> filters) {
    if (criteria.getType() != null) {
      filters.add("type = " + criteria.getType());
    }
  }

}
