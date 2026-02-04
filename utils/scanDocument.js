import DocumentScanner from 'react-native-document-scanner-plugin';


export const scanDocument = async () => {
    try {
        const result = await DocumentScanner.scanDocument({maxNumDocuments:1})
        console.log("resultat", result.scannedImages)
        return result?.scannedImages
    } catch (error) {
        console.error("erreur scan", error)
        return []
    }

}