package com.bwap.weatherapp.WeatherApp.controller;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
@CrossOrigin
@RestController
public class WeatherController {

    private final OkHttpClient client;
    private final String APIkey = "bd1b1cb79ed008045b86cbefbec3f726";

    public WeatherController() {
        this.client = new OkHttpClient();
    }

    @GetMapping("/weather")
    public ResponseEntity<String> getWeather(@RequestParam String cityName) {
        JSONObject weatherData = callWeatherApi(cityName);
        return ResponseEntity.ok(weatherData.toString());
    }

    @GetMapping("/weatherArray")
    public ResponseEntity<String> returnWeatherArray(@RequestParam String cityName) {
        try {
            JSONArray weatherArray = callWeatherApi(cityName).getJSONArray("weather");
            return ResponseEntity.ok(weatherArray.toString());
        } catch (JSONException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

    @GetMapping("/mainObject")
    public ResponseEntity<String> returnMainObject(@RequestParam String cityName) {
        try {
            JSONObject mainObject = callWeatherApi(cityName).getJSONObject("main");
            return ResponseEntity.ok(mainObject.toString());
        } catch (JSONException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

    @GetMapping("/windObject")
    public ResponseEntity<String> returnWindObject(@RequestParam String cityName) {
        try {
            JSONObject windObject = callWeatherApi(cityName).getJSONObject("wind");
            return ResponseEntity.ok(windObject.toString());
        } catch (JSONException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

    @GetMapping("/sysObject")
    public ResponseEntity<String> returnSysObject(@RequestParam String cityName) {
        try {
            JSONObject sysObject = callWeatherApi(cityName).getJSONObject("sys");
            return ResponseEntity.ok(sysObject.toString());
        } catch (JSONException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }


    private JSONObject callWeatherApi(String cityName) {
        Request request = new Request.Builder()
                .url("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric" + "&appid=" + APIkey)
                .build();

        try {
            Response response = client.newCall(request).execute();
            return new JSONObject(response.body().string());
        } catch (IOException | JSONException e) {
            e.printStackTrace();
            return null;
        }
    }
}


