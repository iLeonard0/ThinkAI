package com.thinkai.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.function.context.config.ContextFunctionCatalogAutoConfiguration;

@SpringBootApplication(exclude = ContextFunctionCatalogAutoConfiguration.class)
public class ThinkAiBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ThinkAiBackendApplication.class, args);
	}

}
