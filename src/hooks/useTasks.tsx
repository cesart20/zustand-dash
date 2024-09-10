import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";


interface Options {
    status: TaskStatus;
}


export const useTasks = ({ status }: Options) => {
    const isDragging = useTaskStore( state => !!state.draggingTaskId );
    const onTaskDrop = useTaskStore( state => state.onTaskDrop );
    const addTask = useTaskStore( state => state.addTask );
  
  
    const [onDragOver, setOnDragOver] = useState(false);
  
  
    const handleAddTask = async () => {
  
      const { value, isConfirmed} = await Swal.fire({
        title: 'Nueva Tarea',
        input: 'text',
        inputLabel: 'Nombre de la Tarea',
        inputPlaceholder: 'Escriba el nombre de la tarea',
        showCancelButton: true,
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#4F46E5',
        cancelButtonColor: '#d33',
        inputValidator: (value) => {
          if (!value) {
            return 'El valor no puede estar vacío'
          }
        }
      });
      
      if (!isConfirmed) return;
      
      addTask(value, status);
    }
    
  
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      // console.log('handleDragOver')
      setOnDragOver(true)
    }
  
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      // console.log('handleDragLeave')
      setOnDragOver(false)
    }
  
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setOnDragOver(false)
      onTaskDrop(status);
    }


    return {
        isDragging,

        // Methods
        onDragOver,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    }
}