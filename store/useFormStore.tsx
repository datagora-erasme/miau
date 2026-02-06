import { create } from 'zustand'

interface Document {
    uri: string | null,
    type: string | null,
}
interface Form {
    beneficiary: string | null,
    NumeroDP: string | null
    control: string | null,
    documents: Document[] | null,
    addData: (data: Partial<Form>) => void;
    addDocument: (newDocument: Document) => void,
    resetData: () => void;
}



export const useForm = create<Form>((set) => ({
    beneficiary: null,
    NumeroDP: null,
    control: null,
    documents: null,

    addData: (data) => set((state) => ({
        ...state, ...data
    })),
    addDocument: (doc) => set((state) => ({
        documents: state.documents ? [...state.documents, doc] : [doc]
    })),

    resetData: () => set({
        beneficiary: null,
        NumeroDP: null,
        control: null,
        documents: null,
    })
}))
