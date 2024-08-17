import React from "react";
import { TextInput, StyleSheet } from "react-native";

type TaskFormTextInputProps = {
  title: string;
  setTitle: (title: string) => void;
  inputRef: React.RefObject<TextInput>;
};

export default function TaskFormTextInput({ title, setTitle, inputRef }: TaskFormTextInputProps) {
  return (
    <TextInput
      multiline
      style={styles.input}
      ref={inputRef}
      value={title}
      placeholder="New Task"
      autoCapitalize="none"
      maxLength={512}
      placeholderTextColor="#aaaaaa"
      onChangeText={(text) => setTitle(text)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: "white",
    padding: 20,
    margin: 20,
    height: "auto",
    minHeight: 60,
    maxHeight: 200,
    borderRadius: 20,
    backgroundColor: "#414141",
    fontSize: 18,
    textDecorationStyle: "dotted",
  },
});
