import { Link } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6151C3", // cor de fundo roxa
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          padding: 30,
          borderRadius: 30,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          margin:20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
          Veja como está o tempo ao redor do mundo 🌍
        </Text>
        <Text style={{ fontSize: 16, color: "#888", marginBottom: 20 }}>
          Comece agora gratuitamente
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#6151C3",
            paddingVertical: 15,
            paddingHorizontal: 40,
            borderRadius: 25,
            marginBottom: 20,
          }}
        >
          <Link href={"/main/home"} style={{ color: "#fff", fontSize: 16 }}>
            Vamos lá
          </Link>          
        </TouchableOpacity>

        <Text style={{ fontSize: 14, color: "#888" }}>
          Já tem uma conta?{" "}
          <Link style={{ color: "#6151C3" }} href={"/"}>
            Log in
          </Link>
        </Text>
      </View>
    </View>
  );
}
