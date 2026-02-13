import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "../lib/storage";


interface Auth {
    userToken: string | null
    setToken : (token: string | null) => void
}
export const useAuthStore = create<Auth>()(
  persist(
    (set) => ({
      userToken: null,
      setToken: (token: string | null) => set({ userToken: token }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

interface Document {
  uri: string[];
  type: string | null;
  name: number | null;
}
interface Form {
  date: number | null;
  expiration_date: number;
  beneficiary: string | null;
  NumeroDP: string | null;
  controlName: string | null;
  controlId: number | null;
  documents: Document[];
  counter: number;
  addData: (data: Partial<Form>) => void;
  addDocument: (newDocument: Document) => void;
  updateDocument: (index: number, type: string) => void;
  deleteDocument: (index: number) => void;
  deleteDocumentByUri: (uri: string[]) => void;
  resetData: () => void;
}

export const useForm = create<Form>()(
  persist(
    (set) => ({
      date: null,
      expiration_date: 12 * 60 * 60 * 1000,
      beneficiary: null,
      NumeroDP: null,
      controlName: null,
      controlId: null,
      documents: [],
      counter: 0,

      addData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),
      addDocument: (doc) =>
        set((state) => ({
          documents: [...state.documents, doc],
        })),

      updateDocument: (index, type) =>
        set((state) => {
          if (!state.documents) {
            return state;
          }
          const docs = [...state.documents];
          const uri = docs[index].uri;
          const name = docs[index].name;
          const updatedDoc = { uri: uri, type: type, name: name };
          docs[index] = updatedDoc;
          return { documents: docs };
        }),

      deleteDocument: (index) =>
        set((state) => {
          if (!state.documents) {
            return state;
          }
          const docs = state.documents.filter((_, i) => i !== index);
          return { documents: docs };
        }),

      deleteDocumentByUri: (uri) =>
        set((state) => {
          if (!state.documents) {
            return state;
          }
          const docs = state.documents.filter((doc) => doc.uri !== uri);
          return { documents: docs };
        }),

      resetData: () =>
        set({
          date: null,
          beneficiary: null,
          NumeroDP: null,
          controlName: null,
          controlId: null,
          documents: [],
          counter: 0,
        }),
    }),
    {
      name: "form-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
