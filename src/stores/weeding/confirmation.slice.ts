import { StateCreator } from "zustand";


export interface ConfirmationSlice {
    isConfirmed: boolean;


    setConfirmed: (confirmation: boolean) => void;
}


export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (set) => ({

    isConfirmed: false,

    setConfirmed: (value: boolean) => set({isConfirmed: value}),

})