import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

type AlertFormData = {
  title: string;
  category: string;
  confidence: string;
  justification: string;
};

export default function AlertFormScreen() {
  // CORREÇÃO 1: Adicionado o defaultValues para sincronizar o estado
  const { control, handleSubmit, formState: { errors }, reset } = useForm<AlertFormData>({
    defaultValues: {
      title: '',
      category: '',
      confidence: '',
      justification: ''
    }
  });
  
  const navigation = useNavigation();

  const onSubmit = async (data: AlertFormData) => {
    try {
      const newAlert = { id: Date.now().toString(), ...data };
      
      const storedAlerts = await AsyncStorage.getItem('@territory_alerts');
      const alertsArray = storedAlerts ? JSON.parse(storedAlerts) : [];
      
      alertsArray.push(newAlert);
      await AsyncStorage.setItem('@territory_alerts', JSON.stringify(alertsArray));
      
      // Na web o Alert nativo pode não aparecer, então usamos um alert do navegador se necessário
      if (Platform.OS === 'web') {
        window.alert('Alerta preditivo registrado na base local com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Sucesso', 'Alerta preditivo registrado na base local.', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
      reset();
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert('Falha ao salvar o alerta. Tente novamente.');
      } else {
        Alert.alert('Erro', 'Falha ao salvar o alerta. Tente novamente.');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Novo Alerta Preditivo</Text>
      <Text style={styles.description}>
        Insira os dados da anomalia para notificar a gestão pública.
      </Text>

      {/* Campo: Título */}
      <Text style={styles.label}>Título do Alerta</Text>
      <Controller
        control={control}
        rules={{ required: 'O título é obrigatório.' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="Ex: Risco de enchente no bairro X"
            onBlur={onBlur}
            onChangeText={(text) => onChange(text)} // CORREÇÃO 2: Captura explícita
            value={value}
          />
        )}
        name="title"
      />
      {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

      {/* Campo: Categoria */}
      <Text style={styles.label}>Categoria (Água, Energia, Clima, etc.)</Text>
      <Controller
        control={control}
        rules={{ required: 'Informe a categoria.' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.category && styles.inputError]}
            placeholder="Ex: Clima"
            onBlur={onBlur}
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )}
        name="category"
      />
      {errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}

      {/* Campo: Nível de Confiança */}
      <Text style={styles.label}>Nível de Confiança (%)</Text>
      <Controller
        control={control}
        rules={{ 
          required: 'O nível de confiança é obrigatório.',
          pattern: { value: /^[0-9]+$/, message: 'Apenas números' }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.confidence && styles.inputError]}
            placeholder="Ex: 85"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )}
        name="confidence"
      />
      {errors.confidence && <Text style={styles.errorText}>{errors.confidence.message}</Text>}

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Registrar e Salvar</Text>
      </TouchableOpacity>
      
      <View style={styles.footerSpace} />
    </ScrollView>
  );
}

// Para usar o Platform.OS precisamos importar ele lá em cima
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', marginBottom: 5 },
  description: { fontSize: 14, color: '#7F8C8D', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#34495E', marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#BDC3C7', borderRadius: 8, padding: 12, fontSize: 16 },
  inputError: { borderColor: '#E74C3C' },
  errorText: { color: '#E74C3C', fontSize: 12, marginTop: 4 },
  submitButton: { backgroundColor: '#27AE60', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  submitButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  footerSpace: { height: 50 }
});