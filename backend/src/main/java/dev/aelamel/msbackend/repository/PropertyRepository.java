package dev.aelamel.msbackend.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.meilisearch.sdk.Client;
import com.meilisearch.sdk.Index;
import com.meilisearch.sdk.model.SearchResultPaginated;
import dev.aelamel.msbackend.dto.PaginatedResult;
import dev.aelamel.msbackend.dto.PropertyDTO;
import dev.aelamel.msbackend.dto.request.SearchCriteria;
import dev.aelamel.msbackend.holders.Indices;
import dev.aelamel.msbackend.repository.queries.PropertyQueryBuilder;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PropertyRepository {

  final Client meilisearchClient;

  final ObjectMapper objectMapper;

  public PaginatedResult<PropertyDTO> search(SearchCriteria criteria, int page, int size) {

    Index propertiesIndex = meilisearchClient.index(Indices.PROPERTIES);

    SearchResultPaginated response = (SearchResultPaginated) propertiesIndex.search(
        PropertyQueryBuilder.buildQuery(criteria, page, size)
    );

    List<PropertyDTO> properties = new ArrayList<>();

    response.getHits().forEach(hit -> {
      PropertyDTO propertyDTO = objectMapper.convertValue(hit, PropertyDTO.class);
      properties.add(propertyDTO);
    });

    return PaginatedResult.of(page, size, response.getTotalHits(), response.getTotalPages(), properties, response.getProcessingTimeMs());
  }
}
