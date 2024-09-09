package dev.aelamel.msbackend.service.impl;

import dev.aelamel.msbackend.dto.PaginatedResult;
import dev.aelamel.msbackend.dto.PropertyDTO;
import dev.aelamel.msbackend.dto.request.SearchCriteria;
import dev.aelamel.msbackend.repository.PropertyRepository;
import dev.aelamel.msbackend.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {


  final PropertyRepository propertyRepository;

  @Override
  public PaginatedResult<PropertyDTO> getProperties(SearchCriteria criteria, int page, int size) {
    return propertyRepository.search(criteria, page, size);
  }

}
