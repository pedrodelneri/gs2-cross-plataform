import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Tipagem das propriedades (props) que o componente vai receber
type AlertCardProps = {
  title: string;
  category: string;
  confidence: string;
};

export default function AlertCard({ title, category, confidence }: AlertCardProps) {
  return (
    <View 
      style={styles.card}
      accessible={true}
      accessibilityRole="summary"
      accessibilityLabel={`Alerta: ${title}. Categoria: ${category}. Nível de confiança: ${confidence}%. Este é um suporte à decisão que requer análise humana.`}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>
        Categoria: {category} | Confiança: {confidence}%
      </Text>
      {/* Requisito da prova: Não automatizar decisões de alto impacto */}
      <Text style={styles.warning}>* Suporte à decisão. Requer análise humana.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#F39C12', // Identidade visual própria (laranja de alerta)
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  details: { fontSize: 14, color: '#7F8C8D', marginTop: 4 },
  warning: { fontSize: 12, color: '#E67E22', marginTop: 8, fontWeight: 'bold' }
});