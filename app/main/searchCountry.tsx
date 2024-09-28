import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Button, Image, ActivityIndicator, TouchableOpacity } from "react-native";

type WeatherData = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

export default function WeatherSearchScreen() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [futureWeatherData, setFutureWeatherData] = useState<any | null>(null);

  const handleSearch = () => {
    fetchWeatherData();
    fetchFutureWeatherData();
  };
  
  const fetchFutureWeatherData = async () => {
    const apiKey = "573bf88a1d29466490c231320242709";
    if (!city) return;
  
    setLoading(true);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/future.json?q=${city}&dt=2024-10-15&key=${apiKey}`);
      const data = await response.json();
      setFutureWeatherData(data);
    } catch (error) {
      console.error("Erro ao buscar o clima futuro:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchWeatherData = async () => {
    const apiKey = "573bf88a1d29466490c231320242709";
    if (!city) return;

    setLoading(true);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Erro ao buscar o clima:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite aqui"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>

      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#7C4DFF" />
      ) : weatherData ? (
        <View style={styles.weatherCard}>
          <Image
            source={{ uri: `https:${weatherData.current.condition.icon}` }}
            style={styles.weatherIcon}
          />
          <Text style={styles.cityName}>{weatherData.location.name}</Text>
          <Text style={styles.temperature}>{weatherData.current.temp_c}°C</Text>
          <Text style={styles.weatherCondition}>{weatherData.current.condition.text}</Text>
        </View>
      ) : (
        <View style={styles.weatherCardPlaceholder}>
            <Image source={require("../../assets/images/moon_cloud.png")} style={styles.weatherIcon} />
            <Text style={styles.cityName}>Cidade</Text>
            <Text style={styles.temperature}>X°C</Text>
            <Text style={styles.weatherCondition}>Estado do Tempo</Text>
        </View>
      )}

<View style={styles.otherInfoContainer}>
  {futureWeatherData ? (
    <View style={styles.futureWeatherCard}>
      <Text style={styles.futureDate}>{futureWeatherData.forecast.forecastday[0].date}</Text>
      <Image
        source={{ uri: `https:${futureWeatherData.forecast.forecastday[0].day.condition.icon}` }}
        style={styles.futureWeatherIcon}
      />
      <Text style={styles.futureTemp}>{futureWeatherData.forecast.forecastday[0].day.avgtemp_c}°C</Text>
      <Text style={styles.futureCondition}>{futureWeatherData.forecast.forecastday[0].day.condition.text}</Text>
    </View>
  ) : (
    <Text style={styles.noDataText}>Sem previsão disponível</Text>
  )}
</View>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#D1C4E9",
    borderRadius: 50,
    paddingHorizontal: 20,
    fontSize: 18,
    marginRight: 10,
    height: 45,
    justifyContent: "center",
  },
  searchButton: {
    backgroundColor: "#7C4DFF",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    fontSize: 20,
    color: "#FFF",
  },
  weatherCard: {
    backgroundColor: "#7C4DFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    marginVertical: 20,
  },
  weatherCardPlaceholder: {
    backgroundColor: "#7C4DFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    marginVertical: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  cityName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  temperature: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  weatherCondition: {
    fontSize: 18,
    color: "#fff",
  },
  otherInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  otherInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  infoBox: {
    backgroundColor: "#fff",
    flex: 1,
    height: 150,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  futureWeatherCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5, // Android shadow
    marginBottom: 20,
    width: "90%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  futureDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7C4DFF",
    marginBottom: 10,
  },
  futureWeatherIcon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  futureTemp: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#444",
  },
  futureCondition: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
  },
});
