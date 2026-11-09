import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator 
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { RootStackParamList } from '../../App';

// Componentes e Serviços
import AlertCard from '../components/AlertCard';
import { fetchWeatherForecast } from '../services/api'; // Importando o serviço

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

type AlertData = {
  id: string;
  title: string;
  category: string;
  confidence: string;
};

export default function DashboardScreen({ navigation }: Props) {
  // ESTADO
  const [labels, setLabels] = useState<string[]>([]);
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [localAlerts, setLocalAlerts] = useState<AlertData[]>([]);

  // CONSUMO DE API VIA SERVICE
  const loadWeatherData = async () => {
    try {
      const { days, temps } = await fetchWeatherForecast();
      setLabels(days);
      setTemperatureData(temps);
    } catch (error) {
      console.error("Erro ao carregar dados do serviço:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  // PERSISTÊNCIA: Atualiza a lista de alertas
  useFocusEffect(
    useCallback(() => {
      const loadAlerts = async () => {
        const storedAlerts = await AsyncStorage.getItem('@territory_alerts');
        if (storedAlerts) setLocalAlerts(JSON.parse(storedAlerts));
      };
      loadAlerts();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} accessible={true} accessibilityLabel="Painel de Inteligência Territorial">
          Visão do Território
        </Text>
        <Text style={styles.subtitle}>Previsão Climática (Temperatura Máxima)</Text>
      </View>
      
      {/* GRÁFICO */}
      {loading ? (
        <ActivityIndicator size="large" color="#3498DB" style={{ marginTop: 50 }} />
      ) : temperatureData.length > 0 ? (
        <View 
          style={styles.chartContainer} 
          accessible={true} 
          accessibilityLabel="Gráfico de linha mostrando a previsão de temperatura máxima."
        >
          <LineChart
            data={{
              labels: labels,
              datasets: [{ data: temperatureData }]
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisSuffix="°C"
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(41, 128, 185, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: '4', strokeWidth: '2', stroke: '#2980b9' }
            }}
            bezier
            style={styles.chart}
          />
        </View>
      ) : (
        <Text style={styles.errorText}>Não foi possível carregar o gráfico.</Text>
      )}

      {/* LISTA DE ALERTAS */}
      <View style={styles.alertsSection}>
        <Text style={styles.alertsTitle}>Alertas Registrados pelo Gestor:</Text>
        {localAlerts.length === 0 ? (
          <Text style={styles.noAlertsText}>Nenhum alerta preditivo no radar.</Text>
        ) : (
          localAlerts.map((alert) => (
            <AlertCard 
              key={alert.id}
              title={alert.title}
              category={alert.category}
              confidence={alert.confidence}
            />
          ))
        )}
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('AlertForm')}
        accessible={true}
        accessibilityLabel="Botão para registrar novo alerta preditivo"
      >
        <Text style={styles.buttonText}>+ Registrar Novo Alerta</Text>
      </TouchableOpacity>

      <View style={styles.footerSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA' },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50' },
  subtitle: { fontSize: 16, color: '#7F8C8D', marginTop: 5 },
  chartContainer: { alignItems: 'center', marginBottom: 30, backgroundColor: '#FFF', borderRadius: 16, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, paddingVertical: 10 },
  chart: { borderRadius: 16 },
  errorText: { textAlign: 'center', color: '#E74C3C', marginVertical: 20 },
  alertsSection: { marginBottom: 30 },
  alertsTitle: { fontSize: 18, fontWeight: 'bold', color: '#34495E', marginBottom: 10 },
  noAlertsText: { color: '#95A5A6', fontStyle: 'italic' },
  button: { backgroundColor: '#3498DB', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  footerSpace: { height: 50 }
});