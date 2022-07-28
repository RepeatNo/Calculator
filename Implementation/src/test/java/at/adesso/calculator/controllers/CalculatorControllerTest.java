package at.adesso.calculator.controllers;

import at.adesso.calculator.Calculator;
import at.adesso.calculator.DivisionByZeroException;
import at.adesso.calculator.services.CalculatorService;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.HttpClientBuilder;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootApplication
@ExtendWith(MockitoExtension.class)
class CalculatorControllerTest {
    @Mock
    CalculatorService calculatorService;

    @InjectMocks
    CalculatorController calculatorController;

    @Test
    public void addTest() {
        when(calculatorService.add(1f, 2f)).thenReturn(5f);
        assertEquals(5f, calculatorController.add(1f, 2f));
    }

    @Test
    public void subtractTest() {
        when(calculatorService.subtract(1f, 2f)).thenReturn(3f);
        assertEquals(3f, calculatorController.subtract(1f, 2f));
    }

    @Test
    public void divideTest() throws DivisionByZeroException {
        when(calculatorService.divide(5f, 2.5f)).thenReturn(2f);
        assertEquals(2f, calculatorController.divide(5f, 2.5f));
    }

    @Test
    public void multiplyTest() {
        when(calculatorService.multiply(2f, 3f)).thenReturn(6f);
        assertEquals(6f, calculatorController.multiply(2f, 3f));
    }

    //<editor-fold desc="Add">
    @Test
    public void addStatusOkTest()
            throws ClientProtocolException, IOException {

        // Given
        HttpUriRequest request = new HttpGet("http://localhost:8080/add/-1+4");
        // When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
        // Then
        assertThat(httpResponse.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_OK));
    }

    @Test
    public void addStatusNotFoundTest()
            throws ClientProtocolException, IOException {

        // Given
        HttpUriRequest request = new HttpGet("http://localhost:8080/add/-1:4");
        // When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
        // Then
        assertThat(httpResponse.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_NOT_FOUND));
    }

    @Test
    public void addStatusTest()
            throws ClientProtocolException, IOException {

        // Given
        HttpUriRequest request = new HttpGet("http://localhost:8080/add/test+4");
        // When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
        // Then
        assertThat(httpResponse.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_BAD_REQUEST));
    }

    @Test
    void addMediaTest() throws IOException {
        // Given
        String jsonMimeType = "application/json";
        HttpUriRequest request = new HttpGet("http://localhost:8080/add/-1-4");

        // When
        HttpResponse response = HttpClientBuilder.create().build().execute(request);

        // Then
        String mimeType = ContentType.getOrDefault(response.getEntity()).getMimeType();
        assertEquals(jsonMimeType, mimeType);
    }

    //</editor-fold>
    //<editor-fold desc="Subtract">
    @Test
    public void subtractStatusOkTest()
            throws ClientProtocolException, IOException {

        // Given
        HttpUriRequest request = new HttpGet("http://localhost:8080/subtract/-1-4");
        // When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
        // Then
        assertThat(httpResponse.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_OK));
    }

    @Test
    public void subtractStatusNotFoundTest()
            throws ClientProtocolException, IOException {

        // Given
        HttpUriRequest request = new HttpGet("http://localhost:8080/add/-1:4");
        // When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
        // Then
        assertThat(httpResponse.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_NOT_FOUND));
    }

    @Test
    public void subtractStatusTest()
            throws ClientProtocolException, IOException {

        // Given
        HttpUriRequest request = new HttpGet("http://localhost:8080/subtract/test-4");
        // When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
        // Then
        assertThat(httpResponse.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_BAD_REQUEST));
    }

    @Test
    void subtractMediaTest() throws IOException {
        // Given
        String jsonMimeType = "application/json";
        HttpUriRequest request = new HttpGet("http://localhost:8080/add/-1-4");

        // When
        HttpResponse response = HttpClientBuilder.create().build().execute(request);

        // Then
        String mimeType = ContentType.getOrDefault(response.getEntity()).getMimeType();
        assertEquals(jsonMimeType, mimeType);
    }
    //</editor-fold>
    //<editor-fold desc="Multiply">

    @Test
    public void multiplyStatusOkTest()
            throws ClientProtocolException, IOException {

        // Given
        HttpUriRequest request = new HttpGet("http://localhost:8080/multiply/-1x4");
        // When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
        // Then
        assertThat(httpResponse.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_OK));
    }

    @Test
    public void multiplyStatusNotFoundTest()
            throws ClientProtocolException, IOException {

        // Given
        HttpUriRequest request = new HttpGet("http://localhost:8080/multiply/-1:4");
        // When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
        // Then
        assertThat(httpResponse.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_NOT_FOUND));
    }

    @Test
    public void multiplyStatusTest()
            throws ClientProtocolException, IOException {

        // Given
        HttpUriRequest request = new HttpGet("http://localhost:8080/multiply/testx4");
        // When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
        // Then
        assertThat(httpResponse.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_BAD_REQUEST));
    }

    @Test
    void multiplyMediaTest() throws IOException {
        // Given
        String jsonMimeType = "application/json";
        HttpUriRequest request = new HttpGet("http://localhost:8080/subtract/-1-4");

        // When
        HttpResponse response = HttpClientBuilder.create().build().execute(request);

        // Then
        String mimeType = ContentType.getOrDefault(response.getEntity()).getMimeType();
        assertEquals(jsonMimeType, mimeType);
    }

    //</editor-fold>
    //<editor-fold desc="Divide">
    @Test
    public void divideStatusOkTest()
            throws ClientProtocolException, IOException {

        // Given
        HttpUriRequest request = new HttpGet("http://localhost:8080/divide/-1:4");
        // When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
        // Then
        assertThat(httpResponse.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_OK));
    }

    @Test
    public void divideStatusNotFoundTest()
            throws ClientProtocolException, IOException {

        // Given
        HttpUriRequest request = new HttpGet("http://localhost:8080/divide/-1+4");
        // When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
        // Then
        assertThat(httpResponse.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_NOT_FOUND));
    }

    @Test
    public void divideStatusTest()
            throws ClientProtocolException, IOException {

        // Given
        HttpUriRequest request = new HttpGet("http://localhost:8080/divide/test:4");
        // When
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute(request);
        // Then
        assertThat(httpResponse.getStatusLine().getStatusCode(), equalTo(HttpStatus.SC_BAD_REQUEST));
    }

    @Test
    void divideMediaTest() throws IOException {
        // Given
        String jsonMimeType = "application/json";
        HttpUriRequest request = new HttpGet("http://localhost:8080/subtract/-1-4");

        // When
        HttpResponse response = HttpClientBuilder.create().build().execute(request);

        // Then
        String mimeType = ContentType.getOrDefault(response.getEntity()).getMimeType();
        assertEquals(jsonMimeType, mimeType);
    }
    //</editor-fold>
}