import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from "react-native";

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

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    const apiKey = "573bf88a1d29466490c231320242709";
    const zipCodes = ["10001", "90210", "33101"]; 

    setLoading(true);
    try {
      const weatherResults = await Promise.all(
        zipCodes.map(async (zipCode) => {
          const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${zipCode}&key=${apiKey}`);
          return await response.json();
        })
      );
      setWeatherData(weatherResults);
    } catch (error) {
      console.error("Erro ao buscar os dados do tempo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá User,</Text>
          <Text style={styles.subGreeting}>Descubra o clima</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Text>🌐</Text>
        </View>
      </View>
      
      <View style={styles.searchButton}>
        <Link href={"/main/searchCountry"} style={styles.searchButtonText}>
          Pesquise por uma cidade
        </Link>
      </View>

      <Text style={styles.aroundWorldText}>Ao redor do mundo</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#7C4DFF" />
      ) : (
        weatherData.map((data, index) => (
         
          <View key={index} style={styles.cityCard}>
            <Text style={styles.cityCardText}>{data.location.country}</Text>
            <Text style={styles.cityCardTitle}>{data.location.name}</Text>
            <Text style={styles.cityCardText}>{data.current.condition.text}</Text>
            <Text style={styles.temperature}>{data.current.temp_c}°C</Text>
            <Image source={{ uri: `https:${data.current.condition.icon}` }} style={styles.weatherIcon} />
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subGreeting: {
    fontSize: 16,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
  },
  searchButton: {
    marginVertical: 20,
    backgroundColor: "#7C4DFF",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  aroundWorldText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop:40,
  },
  cityCard: {
    marginBottom: 20,
    backgroundColor: "#7C4DFF",
    padding: 20,
    borderRadius: 20,
  },
  cityCardText: {
    fontSize: 16,
    color: "#fff",
  },
  cityCardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  temperature: {
    fontSize: 16,
    color: "#fff",
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
