package dev.aelamel.msbackend.config;


import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "meilisearch")
@Configuration
@Getter
@Setter
public class MeilisearchProperties {

  private String host;
  private String masterKey;
}
