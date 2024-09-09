package dev.aelamel.msbackend.config;

import com.meilisearch.sdk.Client;
import com.meilisearch.sdk.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MeilisearchConfig {

  @Bean
  public Client meilisearchClient(MeilisearchProperties properties) {
    return new Client(new Config(properties.getHost(), properties.getMasterKey()));
  }
}
