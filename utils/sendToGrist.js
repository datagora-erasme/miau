
import {useForm} from '../store/useFormStore'

export default async function sendToGrist (Form) {
    const deleteDoc = useForm.getState().deleteDocumentByUri
    const currentCounter = useForm.getState().counter
    const addData =  useForm.getState().addData
    const apiKey = process.env.EXPO_PUBLIC_GRIST_API_KEY
    const docId = process.env.EXPO_PUBLIC_GRIST_DOC_ID
    const hostName = process.env.EXPO_PUBLIC_GRIST_HOST
    
    
    
    
    for (const [index, doc] of Form.documents.entries()) {
        
        try {
           
            const formData = new FormData()
            doc.uri.forEach((d, i) => {
                formData.append('upload', {
                    uri: d,
                    name: `${doc.type}_${i + 1}`,
                    type: 'image/jpeg'
                })
    
            })
    
            const sendingImg = await fetch(`https://${hostName}/api/docs/${docId}/attachments`, {
                method: 'POST',
                headers: {
                    'Authorization':`Bearer ${apiKey}`,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData
            })
            const resultImg = await sendingImg.json()
            console.log('resultimgids', resultImg)
    
            const response = await fetch(`https://${hostName}/api/docs/${docId}/tables/Justificatifs/records`, {
                method: 'POST',
                headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                        },
                body: JSON.stringify({
                    "records": [
                        {
                            "fields": {
                                "id_controle": Form.controlId,
                                "Fichier": ["L", ...resultImg],
                                "Type_de_piece": doc.type
                            }
                        }
                    ]
                })
            })


            if(!response.ok) {
                throw new Error((doc.name ).toString())
            }
            const result = await response.json();
            console.log("Succès Grist:", result);
            deleteDoc(doc.uri)
            addData({counter: currentCounter + 1 })
            
            

        } catch(error) {
            throw new Error(`Erreur lors de l'envoi de la pièce n° ${error.message}.` || "Erreur lors de l'envoi des documents.")
        }
    }

}

