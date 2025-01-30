import { FC, useState } from 'react'
import { IAgregarTarea } from '../interface/interface';
import { pb } from '../pBase/PBase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const AgregarTarea: FC = () => {

    const [agregarTareas, setAgregarTareas] = useState<IAgregarTarea>({
        titulo: "",
        detalle: "",
        fecha: "",
        estado: false
    })

    const agregarNuevaTarea = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            "titulo": agregarTareas.titulo,
            "detalle": agregarTareas.detalle,
            "fecha": agregarTareas.fecha,
            "estado": agregarTareas.estado
        };
        try {
            await pb.collection('Tareas').create(data)
        } catch (e) {
            alert(e)
        };
    };

    return (
        <div className='mb-2'>
            <form className='text-center' onSubmit={agregarNuevaTarea}>
                <div className='d-flex justify-content-center align-items-center gap-4'>
                    <div>
                        <input
                            className='border rounded py-2 w-auto'
                            required={true}
                            type="text"
                            placeholder='Titulo'
                            value={agregarTareas.titulo}
                            onChange={(e) => setAgregarTareas({ ...agregarTareas, titulo: e.target.value })}
                        />
                    </div>
                    <div>
                        <input
                            className='border rounded py-2 w-auto'
                            required={true}
                            type="text"
                            placeholder='Detalle'
                            value={agregarTareas.detalle}
                            onChange={(e) => setAgregarTareas({ ...agregarTareas, detalle: e.target.value })}
                        />
                    </div>
                    <div>
                        <input
                            className='border rounded py-2 w-auto'
                            required={true}
                            type="date"
                            value={agregarTareas.fecha}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setAgregarTareas({ ...agregarTareas, fecha: e.target.value })}
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary fw-semibold px-3 py-1"><span className="material-symbols-outlined fs-3 d-flex">add_circle</span></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export { AgregarTarea }
