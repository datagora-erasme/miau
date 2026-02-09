import { create } from 'zustand'

interface Document {
    uri: string ,
    type: string | null,
}
interface Form {
    beneficiary: string | null,
    NumeroDP: string | null
    controlName: string | null,
    controlId: number | null
    documents: Document[],
    addData: (data: Partial<Form>) => void;
    addDocument: (newDocument: Document) => void,
    updateDocument: (index: number, type: string) => void
    deleteDocument: (index: number) => void
    resetData: () => void;
}



export const useForm = create<Form>((set) => ({
    beneficiary: null,
    NumeroDP: null,
    controlName: null,
    controlId: null,
    documents: [],

    addData: (data) => set((state) => ({
        ...state, ...data
    })),
    addDocument: (doc) => set((state) => ({
        documents: [...state.documents, doc]
    
    })),

    updateDocument: (index, type) => set((state) => {
        if (!state.documents) {
            return state
        }
        const docs = [...state.documents]
        const uri = docs[index].uri
        const updatedDoc = {uri: uri, type: type}
        docs[index] = updatedDoc
        return {documents: docs};
    
    }),

    deleteDocument: (index) => set((state) => {
        if (!state.documents) {
            return state
        }
        const docs = state.documents.filter((_, i) => i !== index )
        return {documents: docs}

    }),

    resetData: () => set({
        beneficiary: null,
        NumeroDP: null,
        controlName: null,
        controlId: null,
        documents: [],
    })
}))
