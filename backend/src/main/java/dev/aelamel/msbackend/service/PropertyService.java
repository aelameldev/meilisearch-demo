package dev.aelamel.msbackend.service;

import dev.aelamel.msbackend.dto.PaginatedResult;
import dev.aelamel.msbackend.dto.PropertyDTO;
import dev.aelamel.msbackend.dto.request.SearchCriteria;

public interface PropertyService {

  PaginatedResult<PropertyDTO> getProperties(SearchCriteria criteria, int page, int size);


}
