import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export type EditTaskArgs ={
  taskId: number;
  newTaskTitle: string;
}

export function Home() {
  
  const [tasks, setTasks] = useState<Task[]>([]);
  
  function handleAddTask(newTaskTitle: string) {

    if(tasks.find(item => item.title === newTaskTitle)){
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      )
      return
    }

    const data:Task ={
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldTask => [...oldTask, data])
  }

  function handleToggleTaskDone(id: number) {

    const updatedTasks = tasks.map(task => ({...task}))

    const currentItem = updatedTasks.find(item=>item.id === id);

    if(!currentItem) return;

    currentItem.done = !currentItem.done
    setTasks(updatedTasks);

  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {return},
          style: "cancel"
        },
        { text: "Sim",
          onPress: () =>  setTasks(oldState=>oldState.filter(
            task=> task.id !== id
          ))
        }
      ]
    )
  }

  function handleEditTask({taskId, newTaskTitle}:EditTaskArgs){

    const updatedTasks = tasks.map(task => ({...task}))

    const currentItem = updatedTasks.find(item=>item.id === taskId);

    if(!currentItem) return;

    currentItem.title = newTaskTitle;
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