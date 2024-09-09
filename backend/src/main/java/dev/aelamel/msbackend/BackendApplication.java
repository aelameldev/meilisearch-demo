package dev.aelamel.msbackend;

import com.meilisearch.sdk.Client;
import com.meilisearch.sdk.Index;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

@SpringBootApplication
public class BackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(BackendApplication.class, args);
  }


  //@Bean
  CommandLineRunner clr(Client meilisearchClient) {
    return args -> {

      Path fileName = new ClassPathResource("properties.json").getFile().toPath();

      String propertiesData = Files.readString(fileName);

      Index index = meilisearchClient.index("properties");
      index.deleteAllDocuments();
      index.updateFilterableAttributesSettings(new String[]{"type", "rooms", "bathrooms", "area","_geo", "price"});

      index.addDocuments(propertiesData);

      System.out.println("Indexing finished");
    };
  }
}
