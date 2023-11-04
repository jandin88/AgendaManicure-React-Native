  import React, {useState, useCallback } from 'react';
  import { Text, View, FlatList, StyleSheet, Button } from 'react-native';
  import { useNavigation, useFocusEffect } from '@react-navigation/native';
  import * as SQLite from 'expo-sqlite';

  export default function ViewList() {
    const [appointments, setAppointments] = useState([]);
    const navigation = useNavigation();

    const loadAppointments = () => {
      const db = SQLite.openDatabase('service.db');
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS serviceRecord(name TEXT, phone TEXT, service TEXT, date TEXT)',
          [],
        )
      });
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT name, phone, service, date FROM serviceRecord',
          [],
          (tx, { rows: { _array } }) => {
            setAppointments(_array);
          },
          (error) => {
            console.log('Error selecting from table:', error);
          }
        );
      });
    };
    useFocusEffect(
      useCallback(() => {
        loadAppointments();
      }, [])
    );

    const renderItem = ({ item }) => (
      <View style={styles.card}>
        <Text>Nome: {item.name}</Text>
        <Text>Serviço: {item.service}</Text>
        <Text>Telefone: {item.phone}</Text>
        <Text>Data e Hora: {item.date}</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <View>
          <Button title="Cadastrar" onPress={() => navigation.navigate('Agendar')} />
        </View>
        <FlatList
          data={appointments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor:'#85D2F0',
    },
    card: {
      backgroundColor: 'white',
      marginVertical: 10,
      padding: 16,
      borderRadius: 8,
      elevation: 4,
    },
  });
