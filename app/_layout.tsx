import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"
        options={{
          headerShown: false,
          statusBarColor: "#000"
        }}
      />
      <Stack.Screen
        name="main/home"
        options={{
          title: "Home",
          statusBarColor: "#6151C3",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="main/searchCountry"
        options={{
          title: "Buscar",
          statusBarColor: "#6151C3",
          headerShown: false,
        }}
      />
    </Stack>
    
  );
}
