import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Switch, SafeAreaView } from "react-native";
import { ThemeContext } from "./src/context/ThemeContext";
import Colors from "./src/styles/Colors.js";
import MyKeyboard from "./src/components/MyKeyboard.js";

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={
          theme === "light"
            ? styles.container
            : [styles.container, { backgroundColor: "#000" }]
        }
      >
        <StatusBar style="auto" />
        <Switch
          style={{ marginTop: 40 }}
          value={theme === "light"}
          onValueChange={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        <MyKeyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
