import Constants, { ExecutionEnvironment } from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

export default function Test() {

    const [scannedImages, setScannedImages] = useState<string[]>([]);
    const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient
    const scanDocument = async () => {
        // if (isExpoGo) {
        //     return
        // }

        // start the document scanner
        const { scannedImages: results } = await DocumentScanner.scanDocument()
        console.log("scanned", results)
        // get back an array with scanned image file paths
        if ( results && results.length > 0) {
            // set the img src, so we can view the first scanned image
            setScannedImages(results)
        }
    }
    
    useEffect(() => {
        // call scanDocument on load
        scanDocument()
    }, []);
    
    
    return (
        <ScrollView style={{ flex: 1, marginTop: 50 }}>
        {scannedImages.length > 0 ? (
            scannedImages.map((uri, index) => (
                <View key={index}>
                <Text>Page {index + 1}</Text>
                <Image
                    style={{ width: '100%', height: 400, backgroundColor: '#eee' }}
                    resizeMode="contain"
                    source={{ uri: uri }}
                />
            </View>
        ))
    ) : (
        <Text >Aucun document scanné</Text>
    )}
    </ScrollView>
    )
}