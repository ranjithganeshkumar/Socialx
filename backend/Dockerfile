# syntax=docker/dockerfile:1

# Build stage
FROM maven:3.9.9-amazoncorretto-17 AS build
WORKDIR /app

# Leverage Maven cache
COPY pom.xml .
RUN mvn -q -e -B -DskipTests dependency:go-offline

# Copy source and build
COPY src ./src
RUN mvn -q -e -B -DskipTests clean package

# Runtime stage
FROM amazoncorretto:17-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy fat jar
COPY --from=build /app/target/*.jar /app/app.jar

USER appuser

EXPOSE 8085

ENV JAVA_OPTS=""

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]


