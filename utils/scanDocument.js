import DocumentScanner from 'react-native-document-scanner-plugin';


export const scanDocument = async () => {
    try {
        const result = await DocumentScanner.scanDocument()
        console.log("resultat", result)
        return result?.scannedImages
    } catch (error) {
        console.error("erreur scan", error)
        return null
    }

}