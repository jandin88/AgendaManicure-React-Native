import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { findServiceRecord } from "../db/db";

const ViewList = () => {
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation();

  const loadAppointments = () => {
    findServiceRecord().then((data) => {
      setAppointments(data);
    });
  };
  const randomColor = () => {
    const randomComponent = () => Math.floor(Math.random() * 156) + 180; // Gera valores entre 56 e 255 para obter tons mais claros
    const red = randomComponent();
    const green = randomComponent();
    const blue = randomComponent();
    return `rgb(${red}, ${blue}, ${green})`;
  };

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [])
  );

  const renderItem = ({ item }) => (
    console.log(item),
    (
      <TouchableOpacity
        cons
        onPress={() => navigation.navigate("Editar", item)}
      >
        <View style={[styles.card, { backgroundColor: randomColor() }]}>
          <Text>Nome: {item.name}</Text>
          <Text>Serviço: {item.service}</Text>
          <Text>Telefone: {item.phone}</Text>
          <Text>Data e Hora: {item.date}</Text>
        </View>
      </TouchableOpacity>
    )
  );

  return (
    <View style={styles.container}>
      <View>
        <Button
          title="Cadastrar"
          onPress={() => navigation.navigate("Agendar")}
        />
      </View>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#85D2F0",
  },
  card: {
    marginVertical: 10,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
});

export default ViewList;
