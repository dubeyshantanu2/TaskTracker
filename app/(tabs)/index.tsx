import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from "react-native";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import ListItem from "../../components/ListItem";

interface TaskInterface {
  title: string;
  index: number;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          index: Date.now().toString(),
          title: newTask,
          dueDate: "2024-11-20",
          category: "Work",
        },
      ]);
      setNewTask("");
    }
  };

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index));
  }, []);

  const scrollRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Enter Task</Text>
      <TextInput
        value={newTask}
        onChangeText={setNewTask}
        placeholder="Enter a new task"
        style={styles.input}
      />
      <Button title="Add Task" onPress={addTask} />
      <Text style={styles.title}>Tasks List</Text>
      <ScrollView ref={scrollRef} style={{ flex: 1 }}>
        {tasks.map((task) => (
          <ListItem
            simultaneousHandlers={scrollRef}
            key={task.index}
            task={task}
            onDismiss={onDismiss}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBFF",
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: "5%",
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 50,
    marginHorizontal: "5%",
  },
});

export { TaskInterface };
