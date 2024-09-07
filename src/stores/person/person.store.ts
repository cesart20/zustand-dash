import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { customSessionStorage } from "../storages/custom-session.storage";
// import { firebaseStorage } from "../storages/firebase-session.storage";



interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
    firstName: '',
    lastName: '',

    // actions
    setFirstName: (value: string) => set(({ firstName: value }), false, 'setFirstName'),
    setLastName: (value: string) => set(({ lastName: value }), false, 'setLastName'),
    });


    



export const usePersonStore = create<PersonState & Actions>()(
    devtools(
        persist(
            storeApi
            , {
                name: 'person-storage',
                // storage: customSessionStorage
                // storage: firebaseStorage
            }
        )
    )
);

//para poder pasar el store a otros componentes o store
// usePersonStore.subscribe((nextState, /*prevState*/) => {
//     console.log({nextState, prevState});
    
// });