import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApplicationProvider,
  Layout,
  Input,
  Button,
  Text,
  Divider,
  Spinner,
  Card,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import { addTask, deleteTask, getTasks, updateTask } from "@/api";
import { CardTask } from "@/components/CardTask";

export default function TaskList() {
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const { data, isFetching, error, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: getTasks,
  });

  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setDescription("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isFetching) {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Spinner size="giant" />
          <Text category="s1" style={{ marginTop: 10 }}>
            Carregando tarefas...
          </Text>
        </Layout>
      </ApplicationProvider>
    );
  }

  if (error) {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text category="h6" status="danger">
            Erro: {(error as Error).message}
          </Text>
        </Layout>
      </ApplicationProvider>
    );
  }

  if (!data) {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text category="h6">Nenhuma tarefa disponível</Text>
        </Layout>
      </ApplicationProvider>
    );
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={{ flex: 1, padding: 16 }}>
        <Text category="h4" style={{ textAlign: "center", marginBottom: 12 }}>
          Lista de Tarefas
        </Text>

        <Layout
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Input
            style={{ flex: 1, marginRight: 8 }}
            placeholder="Adicionar tarefa"
            value={description}
            onChangeText={setDescription}
          />
          <Button
            onPress={() => addMutation.mutate({ description })}
            disabled={!description.trim()}
          >
            Adicionar
          </Button>
        </Layout>

        <Divider style={{ marginVertical: 10 }} />

        <FlatList
          data={data.results}
          keyExtractor={(item) => item.objectId}
          renderItem={({ item: task }) => (
            <Card
              style={{ marginVertical: 6 }}
              status={task.done ? "success" : "basic"}
            >
              <CardTask
                key={task.objectId}
                task={task}
                onDelete={deleteMutation.mutate}
                onCheck={updateMutation.mutate}
              />
            </Card>
          )}
        />

        {isPending && (
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Spinner size="small" />
            <Text category="c1">Enviando...</Text>
          </View>
        )}
      </Layout>
    </ApplicationProvider>
  );
}
