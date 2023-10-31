import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

/* 
export const consultaTarea = async () => {
    const records = await pb.collection('listaTarea').getFullList({
        sort: '-created',
    });
}
export const crearTarea = async () => {
    const record = await pb.collection('listaTarea').create(data);
}

export const editarTarea = async () => {
    const record = await pb.collection('listaTarea').update('RECORD_ID', data);
}

export const borrarTarea = async () => {
    await pb.collection('listaTarea').delete('RECORD_ID');
} */