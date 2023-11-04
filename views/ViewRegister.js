import React, { useState } from 'react';
import { View, Text, Button, TextInput,    } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns';
import * as SQLite from 'expo-sqlite';

const CadastroCliente = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [service, setService] = useState('');
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [msgError, setMsgError] = useState('')
  const formattedDate = selectedDate
    ? format(selectedDate, 'HH:mm dd/MM/yyyy')
    : '';

  const showDateTimePicker = () => {
    setDateTimePickerVisibility(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDateTimePicker();
  };

  const handleCadastro = () => {
    check =  nome !== '' || telefone !== '' || service !== '' || selectedDate !== null
    if (check) {
      setMsgError('')
      const db = SQLite.openDatabase('service.db');

      db.transaction(tx => {

        tx.executeSql(
          'INSERT INTO serviceRecord(name, phone, service, date) VALUES (?, ?, ?, ?)',
          [nome, telefone, service, formattedDate],
          (_, result) => {
            console.log('Data inserted successfully', result);
          },
          (error) => {
            console.log('Error inserting data:', error);
          }
        );
      });

      console.log("Nome:", nome);
      console.log("Telefone:", telefone);
      console.log("Observação:", service);
      console.log("Data e Hora Selecionadas:", formattedDate);
    }else{
      setMsgError("Digite todos os dados")
    }
  };


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Yasmin Nails</Text>
      <View style={styles.formContainer}>
        <Text style={styles.notInfo}>{msgError}</Text>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="numeric"

        />

        <Text style={styles.label}>Serviço Desejado:</Text>
        <TextInput
          style={styles.input}
          placeholder="Observação"
          value={service}
          onChangeText={setService}
        />

        <Text style={styles.label}>Selecionar Data e Hora</Text>
        <TextInput
          style={styles.input}
          placeholder="Selecionar Data e Hora"
          onFocus={showDateTimePicker}
          value={formattedDate}
        />
        <DateTimePickerModal
          isVisible={isDateTimePickerVisible}
          mode="datetime"
          onConfirm={handleDateConfirm}
          onCancel={hideDateTimePicker}
        />

        <Button title="Cadastrar" onPress={handleCadastro} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  formContainer: {

    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    marginTop: 60,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'pink',
  },
  input: {
    borderWidth: 1,
    borderColor: 'pink',
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
  notInfo: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 16,
  }
});

export default CadastroCliente;
