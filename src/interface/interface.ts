export interface ITarea {
    id: string;
    titulo: string;
    detalle: string;
    fecha: string;
    estado: boolean;
}
export interface IAgregarTarea {
    titulo: string;
    detalle: string;
    fecha: string;
    estado: boolean;
}
export interface IEditarTarea {
    id: string;
    titulo: string;
    detalle: string;
    fecha: string;
}