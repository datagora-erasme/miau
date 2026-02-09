

export default async function sendToGrist (Form) {
    
    const apiKey = process.env.EXPO_PUBLIC_GRIST_API_KEY
    const docId = process.env.EXPO_PUBLIC_GRIST_DOC_ID
    const hostName = process.env.EXPO_PUBLIC_GRIST_HOST
    try {
        
        
        const formData = new FormData()
        
        Form.documents.forEach((doc) => {
            formData.append('upload', {
                uri: doc.uri,
                name: doc.type,
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
                            "Fichier": ["L", resultImg[0]],
                            "Type_de_piece": Form.documents[0].type
                        }
                    }
                ]
            })
        })
        const result = await response.json();
        console.log("Succès Grist:", result);
    } catch (error) {
        console.error("Erreur export Grist:", error);
    }


}

