import React, { useState } from "react";
import { Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import {
  ApplicationProvider,
  Layout,
  Input,
  Button,
  Text,
  Card,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

export default function Index() {
  const router = useRouter();
  const [idade, setIdade] = useState("");
  const [showDetails, setShowDetails] = useState(true);

  const anoNasc = new Date().getFullYear() - parseInt(idade);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Layout
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <Text category="h1" style={{ marginBottom: 20 }}>
              Olá Turma!
            </Text>

            <Image
              source={require("@/assets/images/avatar.jpg")}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                marginBottom: 20,
              }}
            />

            <Card
              onPress={() => setShowDetails(!showDetails)}
              style={{
                marginVertical: 10,
                width: "100%",
              }}
            >
              <Text
                appearance="hint"
                category="s1"
                numberOfLines={showDetails ? 0 : 2}
              >
                Este é um App de exemplo da disciplina Programação Web e Mobile
                do Curso de Ciência da Computação da Universidade Católica de
                Pernambuco (semestre 2025.2)
              </Text>
            </Card>

            {!isNaN(anoNasc) && (
              <Text category="s1" style={{ marginVertical: 8 }}>
                Você nasceu em {anoNasc}
              </Text>
            )}

            <Input
              style={{ width: 250, marginVertical: 12 }}
              value={idade}
              label="Qual a sua idade?"
              placeholder="Digite sua idade"
              keyboardType="numeric"
              onChangeText={setIdade}
            />

            <Layout
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 250,
                marginVertical: 10,
              }}
            >
              <Button
                style={{ flex: 1, marginRight: 10 }}
                onPress={() => alert("Botão OK pressionado")}
              >
                OK
              </Button>
              <Button
                style={{ flex: 1 }}
                appearance="outline"
                status="danger"
                onPress={() => alert("Botão Cancel pressionado")}
              >
                Cancelar
              </Button>
            </Layout>

            <Button
              style={{ marginTop: 20, width: 250 }}
              onPress={() => router.navigate("/taskList")}
            >
              Ir para Lista de Tarefas
            </Button>

            <Layout style={{ height: 70 }} />
          </Layout>
        </ScrollView>
      </Layout>
    </ApplicationProvider>
  );
}
