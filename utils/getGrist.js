export async function getGrist(endUrl) {
    await new Promise(resolve => setTimeout(resolve, 3000));
            
    const apiKey = process.env.EXPO_PUBLIC_GRIST_API_KEY
    const docId = process.env.EXPO_PUBLIC_GRIST_DOC_ID
    const host = process.env.EXPO_PUBLIC_GRIST_HOST

    try {
        const response = await fetch(`https://${host}/api/docs/${docId}/tables/${endUrl}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            const errorText = await response.text();
            console.error(errorText)
            throw new Error()
        }
    
        const result = await response.json()
        return result

    } catch (error) {
        throw new Error("Erreur de connexion à la base de donnée.")
    }

    }