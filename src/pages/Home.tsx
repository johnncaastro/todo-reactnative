import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskArgs {
  taskId: number,
  taskNewTitle: string,
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find(task => task.title === newTaskTitle);

    if(taskAlreadyExists) {
      return Alert.alert('Task já cadastrada',
      'Você não pode cadastrar uma task com o mesmo nome.')
    }

    setTasks([ ...tasks, {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false}
    ])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const foundTask = updatedTasks.find(task => task.id === id)

    if(!foundTask) return;

    foundTask.done = !foundTask.done;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover task', 'Tem certeza que deseja remover a task?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const tasksFiltered = tasks.filter(task => task.id !== id)

          setTasks(tasksFiltered);
        }
      }
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId);

    if(!taskToBeUpdated) return;

    taskToBeUpdated.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})