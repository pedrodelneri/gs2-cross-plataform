# 🏙️ Painel de Inteligência Territorial

*Disciplina:* Cross-Platform Application Development  
*Instituição:* FIAP - Global Solution  

PARTICIPANTES 

Pedro Del Neri Correia - RM 562168
Lucas de Freitas Barbosa - RM 564685
Arthur da Silva Alencar - RM 563684

## 📋 Descrição do Projeto
O *Painel de Inteligência Territorial* é um aplicativo mobile desenvolvido em React Native focado em auxiliar gestores públicos na tomada de decisão. O app atua como uma central de monitoramento urbano, cruzando informações sobre consumo de recursos (água e energia), clima local e demanda de serviços. O objetivo principal é antecipar problemas que afetam a qualidade de vida da população através de dashboards analíticos e alertas preditivos, garantindo que o gestor tenha embasamento em dados sem automatizar decisões de alto impacto social.

## 🚀 Funcionalidades
- *Dashboards Interativos:* Visualização gráfica de indicadores vitais da cidade, como níveis de reservatórios, consumo de energia e anomalias climáticas.
- *Alertas Preditivos:* Sistema de cards informando potenciais riscos (ex: enchentes, quedas de energia) com grau de confiança, justificativa técnica e limitações da previsão.
- *Apoio à Decisão:* Interface projetada para suporte humano e estratégico, respeitando a privacidade dos cidadãos e os limites da automação.
- *Persistência Local:* Salvamento de preferências de acessibilidade e sessão do gestor utilizando AsyncStorage.

## 🛠️ Tecnologias Utilizadas
- *Framework:* React Native com Expo
- *Navegação:* React Navigation (Bottom Tabs / Native Stack)
- *Gerenciamento de Estado:* Context API
- *Requisições HTTP:* Axios
- *Gráficos:* React Native Chart Kit (ou Gifted Charts)
- *Persistência de Dados:* AsyncStorage

## 📊 Fontes de Dados
Para o escopo desta Global Solution, o aplicativo consome as seguintes fontes:
1. *Dados Climáticos Reais:* Integração com a API do OpenWeather para obtenção de dados de temperatura, umidade e volume de chuvas da região monitorada.
2. *Dados de Consumo e Serviços (Sintéticos):* Utilização de uma API Mock (ex: MockAPI.io ou JSON Server) para simular o consumo de água, energia e os relatórios de alerta preditivo gerados pelos sensores urbanos.

## ⚠️ Limitações do Sistema
- *Não Automação de Decisões:* O aplicativo não executa ações automáticas de alto impacto (como desligar a rede elétrica de um bairro). Ele atua exclusivamente como ferramenta de recomendação e visualização para o gestor.
- *Confiabilidade Preditiva:* Os alertas exibidos baseiam-se em modelos estatísticos limitados aos dados disponíveis pelas APIs sintéticas. Fatores externos e físicos não mapeados (como bueiros obstruídos não reportados) não são contabilizados na margem de confiança.
- *Mock de Autenticação:* A versão atual foca na arquitetura e visualização, utilizando simulação de login de gestor sem um backend de autenticação robusto com criptografia em produção.
