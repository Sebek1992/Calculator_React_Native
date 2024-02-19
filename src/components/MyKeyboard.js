import React, { useState } from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles.js";
import Colors from "../styles/Colors.js";

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null); //

  const handleNumberPress = (buttonValue) => {
    if (buttonValue === "." && firstNumber.includes(".")) return; //
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue) => {
    if (buttonValue === "+/-") {
      if (firstNumber !== "") {
        setFirstNumber((parseFloat(firstNumber) * -1).toString());
      } else if (secondNumber !== "") {
        setSecondNumber((parseFloat(secondNumber) * -1).toString());
      }
    } else {
      setOperation(buttonValue);
      setSecondNumber(firstNumber);
      setFirstNumber("");
    }
  };

  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [Styles.screenFirstNumber, { color: Colors.result }]
              : [
                  Styles.screenFirstNumber,
                  { fontSize: 50, color: Colors.result },
                ]
          }
        >
          {result?.toString()}
        </Text>
      );
    } else {
      // Domyślne wyświetlanie liczby pierwszej
      return <Text style={Styles.screenFirstNumber}>{firstNumber || "0"}</Text>;
    }
  };

  const getResult = () => {
    const first = parseFloat(secondNumber);
    const second = parseFloat(firstNumber);
    switch (operation) {
      case "+":
        setResult(first + second);
        break;
      case "-":
        setResult(first - second);
        break;
      case "*":
        setResult(first * second);
        break;
      case "/":
        if (second === 0) {
          setResult("Error");
        } else {
          setResult(first / second);
        }
        break;
      case "%":
        setResult((first * second) / 100);
        break;
      default:
        setResult(0);
        break;
    }
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
  };

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <Text style={Styles.screenSecondNumber}>{secondNumber}</Text>
        <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>
          {operation}
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={Styles.row}>
        <Button title="C" isGray onPress={clear} />
        <Button
          title="+/-"
          isGray
          onPress={() => handleOperationPress("+/-")}
        />
        <Button title="%" isGray onPress={() => handleOperationPress("%")} />
        <Button title="/" isGray onPress={() => handleOperationPress("/")} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="*" isBlue onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button
          title="<"
          onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
        />
        <Button title="=" isBlue onPress={() => getResult()} />
      </View>
    </View>
  );
}
