import React, { FC, useEffect, useState } from 'react'
import { IEditarTarea, ITarea } from '../interface/interface';
import { pb } from '../pBase/PBase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ListaTarea: FC = () => {

    const [Tareas, setTareas] = useState<Array<ITarea> | null>(null)
    const [EditarTarea, setEditarTarea] = useState<IEditarTarea | null>(null);

    const consultarTareas = async () => {
        try {
            const resp = await pb.collection('Tareas').getFullList<ITarea>();
            setTareas(resp);
        } catch (e) {
            console.log("Error a consular la lista de Tareas", e);
        }
    }

    const editarTarea = (tarea: ITarea) => {
        setEditarTarea(tarea);
    };

    const guardarTareaEditada = async () => {
        try {
            if (EditarTarea !== null) {
                if (!EditarTarea.titulo || !EditarTarea.detalle || !EditarTarea.fecha) {
                    alert("Por favor, completa todos los campos antes de guardar la tarea editada.");
                    return;
                }
                await pb.collection('Tareas').update(EditarTarea.id, EditarTarea);
                setEditarTarea(null);
                consultarTareas();
            }
        } catch (e) {
            console.log("Error al editar tarea", e);
        }
    };

    const eliminarTarea = async (index: number) => {
        try {
            if (Tareas != null) {
                const tareaEliminar = Tareas[index];
                await pb.collection('Tareas').delete(tareaEliminar.id);
                setTareas([...Tareas].splice(index, 1));
            }
        } catch (e) {
            console.log("Hubo un error al momento de eliminar la tarea", e)
        }
    };

    const cambiarEstadoTarea = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const tarea = Tareas?.find((i) => i.id === id)
            if (typeof tarea !== "undefined") {
                tarea.estado = e.currentTarget.checked
                await pb.collection('Tareas').update(id, tarea)
                setTareas([...Tareas!])
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        pb.collection('Tareas').subscribe<ITarea>('*', (e) => {
            setTareas((prevTareas) => {
                const tareasActualizadas = prevTareas ?? [];

                if (e.action === 'create') {
                    return [...tareasActualizadas, e.record];
                }
                if (e.action === 'delete') {
                    return tareasActualizadas.filter(i => i.id !== e.record.id);
                }
                if (e.action === 'update') {
                    return tareasActualizadas.map((i) => (i.id === e.record.id ? e.record : i));
                }
                return tareasActualizadas;
            });
        });

        return () => {
            pb.collection('Tareas').unsubscribe('*');
        };
    }, []);



    useEffect(() => {
        consultarTareas();
    }, []);


    return (
        <div className=''>
            <div className='d-flex justify-content-center'>
                <table className="table table-bordered p-3 w-75">
                    <thead className=''>
                        <tr>
                            <th scope="col" className='text-center'></th>
                            <th scope="col" className='text-center bg-primary text-white'>ID</th>
                            <th scope="col" className='text-center'>TITULO</th>
                            <th scope="col" className='text-center'>DETALLE</th>
                            <th scope="col" className='text-center'>FECHA</th>
                            <th scope="col" className='text-center'>ESTADO</th>
                            <th scope='col' className='text-center'>OPCIONES</th>
                        </tr>
                    </thead>
                    {Tareas && Tareas.length > 0
                        ?
                        Tareas.map((item, id) => (
                            <tbody key={item.id}>
                                <tr className='align-middle'>
                                    <td className='text-center fs-2'><input onChange={(e) => cambiarEstadoTarea(item.id, e)} checked={item.estado} className="form-check-input border border-secondary" type="checkbox" value="" aria-label="..." /></td>
                                    <td className='fw-semibold bg-primary text-white text-center'>{'#' + item.id.toString().slice(0, 6).toUpperCase()}</td>
                                    <td className='fw-semibold text-center'>
                                        {EditarTarea !== null &&
                                            EditarTarea.id === item.id ? (
                                            <input
                                                type="text"
                                                value={EditarTarea.titulo}
                                                onChange={(e) => setEditarTarea({ ...EditarTarea, titulo: e.target.value })}
                                                required={true}
                                            />
                                        ) : (
                                            item.titulo
                                        )}
                                    </td>
                                    <td className='text-center max-w-25'>
                                        {EditarTarea !== null &&
                                            EditarTarea.id === item.id ? (
                                            <input
                                                type="text"
                                                value={EditarTarea.detalle}
                                                onChange={(e) => setEditarTarea({ ...EditarTarea, detalle: e.target.value })}
                                            />
                                        ) : (
                                            item.detalle
                                        )}
                                    </td>
                                    <td className='text-center fw-semibold'>
                                        {EditarTarea !== null &&
                                            EditarTarea.id === item.id ? (
                                            <input
                                                type="date"
                                                value={EditarTarea.fecha}
                                                onChange={(e) => setEditarTarea({ ...EditarTarea, fecha: e.target.value })}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        ) : (
                                            item.fecha.slice(0, 11)
                                        )}
                                    </td>
                                    <td className={`fw-bold text-center text-white ${item.estado ? 'bg-success' : 'bg-danger'}`}>{item.estado ? 'COMPLETADO' : 'PENDIENTE'}</td>
                                    <td className='text-center'>
                                        <button className="btn btn-danger me-2" onClick={() => eliminarTarea(id)}>
                                            <span className="material-symbols-outlined fs-5 p-1">delete</span>
                                        </button>
                                        {EditarTarea !== null &&
                                            EditarTarea.id === item.id ? (
                                            <button className="btn btn-success me-2" onClick={guardarTareaEditada}
                                            >
                                                <span className="material-symbols-outlined fs-5 p-1">save</span>
                                            </button>
                                        ) : (
                                            <button className='btn btn-primary me-2' onClick={() => editarTarea(item)}>
                                                <span className="material-symbols-outlined fs-5 p-1">edit</span>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        ))
                        :
                        null
                    }
                </table>
            </div>
        </div>
    )
}

export { ListaTarea }
