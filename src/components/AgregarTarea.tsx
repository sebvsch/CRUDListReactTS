import { useContext } from 'react'
import { TareasContext } from '../context/ListaTareaContext'
import { Tarea } from '../interface/interface';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


function AgregarTarea() {

    const {
        newTareaTitulo,
        setNewTareaTitulo,
        newTareaDetalle,
        setNewTareaDetalle,
        newTareaFecha,
        setNewTareaFecha,
        tareas,
        setTareas,
        pb
    } = useContext(TareasContext)

    const aggTarea = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = {
            "titulo": newTareaTitulo,
            "detalle": newTareaDetalle,
            "fecha": newTareaFecha,
            "estado": false,
        };

        const record = await pb.collection('listaTarea').create(data);

        const nuevaTarea: Tarea = {
            id: record.id,
            titulo: newTareaTitulo,
            detalle: newTareaDetalle,
            fecha: newTareaFecha,
            estado: false,
        };
        setTareas([...tareas, nuevaTarea])

        setNewTareaTitulo('');
        setNewTareaDetalle('');
        setNewTareaFecha('')
    }

    return (
        <div className='mb-3'>
            <form className='text-center' onSubmit={aggTarea}>
                <div className='d-inline-block gap-2 col-2 mx-auto' style={{ marginBottom: '10px' }}>
                    <input
                        className='border rounded py-2 w-75'
                        required={true}
                        type="text"
                        placeholder='Titulo'
                        value={newTareaTitulo}
                        onChange={e => setNewTareaTitulo(e.target.value)}
                    />
                </div>
                <div className='d-inline-block gap-2 col-2 mx-auto' style={{ marginBottom: '10px' }}>
                    <input
                        className='border rounded py-2 w-75'
                        required={true}
                        type="text"
                        placeholder='Detalle'
                        value={newTareaDetalle}
                        onChange={e => setNewTareaDetalle(e.target.value)}
                    />
                </div>
                <div className='d-inline-block gap-2 col-2 mx-auto' style={{ marginBottom: '10px' }}>
                    <input
                        className='border rounded py-2 w-75'    
                        required={true}
                        type="date"
                        value={newTareaFecha}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setNewTareaFecha(e.target.value)}
                    />
                </div>
                <div className='d-inline-block gap-2 col-2 mx-auto' style={{ marginBottom: '10px' }}>
                    <button className="btn btn-primary fw-semibold"><span className="material-symbols-outlined fs-3 p-1">add_circle</span></button>
                </div>

            </form>
        </div>
    )
}

export default AgregarTarea
