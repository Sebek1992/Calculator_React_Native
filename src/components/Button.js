import { useContext } from "react";
import { Pressable, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Styles } from "../styles/GlobalStyles.js";

export default function Button({ title, onPress, isBlue, isGray }) {
  const theme = useContext(ThemeContext);
}
