import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl = 'https://zustand-storag-default-rtdb.firebaseio.com/zustand';

const storageApi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        
        try {
            const data = await fetch(`${firebaseUrl}/${name}.json`)
                .then(res => res.json());

            console.log(data);
            
            return JSON.stringify(data);

        } catch (error) {
            console.log(error);
            throw error
            
        }
    },
    setItem: async function (name: string, value: string): Promise<void> {
        // console.log('setItem', { name, value })
        await fetch(`${firebaseUrl}/${name}.json`,{
            method: 'PUT',
            body: value
        })
        .then(res => res.json());

        // console.log(data);
        

        return;

    },
    removeItem: function (name: string): void | Promise<void> {
        console.log('removeItem', name)
    }
}

export const firebaseStorage = createJSONStorage(() => storageApi)