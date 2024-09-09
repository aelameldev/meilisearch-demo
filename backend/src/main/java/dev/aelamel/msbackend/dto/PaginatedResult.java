package dev.aelamel.msbackend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PaginatedResult<T> {

  private int page;
  private int size;
  private long totalElements;
  private long totalPages;
  private List<T> data;
  private int executionTime;


  public static <T> PaginatedResult<T> of(int page, int pageSize, long total, long totalPages, List<T> data, int executionTime) {
    return new PaginatedResult<>(page, pageSize, total, totalPages, data, executionTime);
  }

}
