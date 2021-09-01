import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


interface TaskData{
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  //const [newTask, setNewTask] = useState("");

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const data:TaskData ={

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
    //TODO - remove task from state
    setTasks(oldState=>oldState.filter(
      task=> task.id !== id
    ))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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