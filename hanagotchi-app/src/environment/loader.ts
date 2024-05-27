const env = {
    hanagotchiGatewayUrl: process.env.HANAGOTCHI_GATEWAY_URL,
    googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    revGeoCodeApId: process.env.REV_GEO_CODE_API_ID,
    revGeoCodeApiKey: process.env.REV_GEO_CODE_API_KEY,
    openWeatherApiUrl: process.env.OPEN_WEATHER_API_URL,
    openWeatherAppId: process.env.OPEN_WEATHER_APP_ID,
    firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
    }
}

export default env;
