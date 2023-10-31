import React, { useState, useEffect, createContext } from 'react';
import { Tarea } from '../interface/interface';
import PocketBase from 'pocketbase';
import { pb } from '../pBase/PBase';


type TareasType = {
    newTareaTitulo: string;
    setNewTareaTitulo: React.Dispatch<React.SetStateAction<string>>;
    newTareaDetalle: string;
    setNewTareaDetalle: React.Dispatch<React.SetStateAction<string>>;
    newTareaFecha: string;
    setNewTareaFecha: React.Dispatch<React.SetStateAction<string>>;
    tareas: Tarea[];
    setTareas: React.Dispatch<React.SetStateAction<Tarea[]>>;
    editingTaskIndex: number | null;
    setEditingTaskIndex: React.Dispatch<React.SetStateAction<number | null>>;
    editedTask: Tarea | null;
    setEditedTask: React.Dispatch<React.SetStateAction<Tarea | null>>;
    pb: PocketBase;
}

export const TareasContext = createContext<TareasType>(
    {} as TareasType
);

export function TareasContextProvider({ children }: any) {

    const [newTareaTitulo, setNewTareaTitulo] = useState<string>('')
    const [newTareaDetalle, setNewTareaDetalle] = useState<string>('')
    const [newTareaFecha, setNewTareaFecha] = useState<string>('');
    const [tareas, setTareas] = useState<Tarea[]>([])
    const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
    const [editedTask, setEditedTask] = useState<Tarea | null>(null);

    const consultarTareas = async () => {
        const respuesta = await pb.collection('listaTarea').getFullList<Tarea>(undefined, { sort: '-created' });
        setTareas(respuesta); 
    }

    useEffect(() => {
        pb.collection('listaTarea').subscribe<Tarea>('*', (e) => {
            if (e.action === 'create') {
                setTareas((prevTareas) => [...prevTareas, e.record]);
            }
            if (e.action === 'delete') {
                const borrarTarea = e.record.id;
                setTareas((prevTareas) => prevTareas.filter(i => i.id !== borrarTarea));
            }
            if (e.action === 'update') { 
                setTareas((prevTareas) => prevTareas.map((i) => (i.id === e.record.id ? e.record : i)));
            }
        });

        return () => {
            pb.realtime.unsubscribe(); // don't forget to unsubscribe
        };
    });

    useEffect(() => {
        consultarTareas();
    }, []);


    return (
        <TareasContext.Provider value={{
            newTareaTitulo,
            setNewTareaTitulo,
            newTareaDetalle,
            setNewTareaDetalle,
            newTareaFecha,
            setNewTareaFecha,
            tareas,
            setTareas,
            editingTaskIndex,
            setEditingTaskIndex,
            editedTask,
            setEditedTask,
            pb
        }}>
            {children}
        </TareasContext.Provider>
    )
}