package dev.aelamel.msbackend.web;


import dev.aelamel.msbackend.dto.PaginatedResult;
import dev.aelamel.msbackend.dto.PropertyDTO;
import dev.aelamel.msbackend.dto.request.SearchCriteria;
import dev.aelamel.msbackend.holders.ApiPaths;
import dev.aelamel.msbackend.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = ApiPaths.PROPERTIES)
@RequiredArgsConstructor
public class PropertyController {

  final PropertyService propertyService;

  @GetMapping
  public PaginatedResult<PropertyDTO> getProperties(SearchCriteria criteria, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
    return propertyService.getProperties(criteria, page, size);
  }
}
