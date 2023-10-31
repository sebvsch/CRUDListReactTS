import React from 'react'
import { useContext } from 'react'
import { TareasContext } from '../context/ListaTareaContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Tarea } from '../interface/interface';

function ListaTarea() {

    const {
        tareas,
        setTareas,
        editedTask,
        setEditedTask,
        pb
    } = useContext(TareasContext)

    const eliminarTarea = async (index: number) => {
        const tareaEliminar = tareas[index];
        await pb.collection('listaTarea').delete(tareaEliminar.id);
        const nuevasTareas = [...tareas];
        nuevasTareas.splice(index, 1);
        setTareas(nuevasTareas);
    };

    const editarTarea = (tarea: Tarea) => {
        setEditedTask(tarea);
    };

    const cambiarEstado = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const nuevasTareas = [...tareas];
        const tarea = nuevasTareas.find((i) => i.id === id)
        if (typeof tarea !== "undefined") {
            tarea.estado = e.currentTarget.checked;
            await pb.collection('listaTarea').update(id, tarea);
            setTareas(nuevasTareas);
            setEditedTask(null);
        }
    };

    const guardarTareaEditada = async () => {
        if (editedTask !== null) {
            if (!editedTask.titulo || !editedTask.detalle || !editedTask.fecha) {
                alert("Por favor, completa todos los campos antes de guardar la tarea editada.");
                return;
            }

            await pb.collection('listaTarea').update(editedTask.id, editedTask);
            setEditedTask(null);
        }
    };

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
                {tareas && tareas.length > 0
                    ?
                    tareas.map((tarea, id) => (
                        <tbody key={tarea.id}>
                            <tr className='align-middle'>
                                <td className='text-center fs-2'><input onChange={(e) => cambiarEstado(tarea.id, e)} checked={tarea.estado} className="form-check-input border border-secondary" type="checkbox" value="" aria-label="..." /></td>
                                <td className='fw-semibold bg-primary text-white text-center'>{'#' + tarea.id.toString().slice(0, 6).toUpperCase()}</td>
                                <td className='fw-semibold text-center'>
                                    {editedTask !== null &&
                                        editedTask.id === tarea.id ? (
                                        <input
                                            type="text"
                                            value={editedTask.titulo}
                                            onChange={(e) => setEditedTask({ ...editedTask, titulo: e.target.value })}
                                            required={true}
                                        />
                                    ) : (
                                        tarea.titulo
                                    )}
                                </td>
                                <td className='text-center max-w-25'>
                                    {editedTask !== null &&
                                        editedTask.id === tarea.id ? (
                                        <input
                                            type="text"
                                            value={editedTask.detalle}
                                            onChange={(e) => setEditedTask({ ...editedTask, detalle: e.target.value })}
                                        />
                                    ) : (
                                        tarea.detalle
                                    )}
                                </td>
                                <td className='text-center fw-semibold'>
                                    {editedTask !== null &&
                                        editedTask.id === tarea.id ? (
                                        <input
                                            type="date"
                                            value={editedTask.fecha}
                                            onChange={(e) => setEditedTask({ ...editedTask, fecha: e.target.value })}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    ) : (
                                        tarea.fecha.slice(0, 11)
                                    )}
                                </td>
                                <td className={`fw-bold text-center text-white ${tarea.estado ? 'bg-success' : 'bg-danger'}`}>{tarea.estado ? 'COMPLETADO' : 'PENDIENTE'}</td>
                                <td className='text-center'>
                                    <button className="btn btn-danger me-2" onClick={() => eliminarTarea(id)}>
                                        <span className="material-symbols-outlined fs-5 p-1">delete</span>
                                    </button>
                                    {editedTask !== null &&
                                        editedTask.id === tarea.id ? (
                                        <button className="btn btn-success me-2" onClick={guardarTareaEditada}
                                        >
                                            <span className="material-symbols-outlined fs-5 p-1">save</span>
                                        </button>
                                    ) : (
                                        <button className='btn btn-primary me-2' onClick={() => editarTarea(tarea)}>
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

export default ListaTarea
