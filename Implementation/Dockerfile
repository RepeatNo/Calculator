FROM openjdk:20-jdk
EXPOSE 8080
ADD target/calculator-1.0.jar calculator.jar
ENTRYPOINT ["java","-jar","calculator.jar"]