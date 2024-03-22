# app-mobile
Repositorio para la app mobile de Hanagotchi

# Instalación Expo 
Primero instalamos con npm explo-cli y eas-cli (debemos de tener **Node.js** y **npm** instalados)

```shell
npx install -g expo-cli
```

```shell
npm install -g eas-cli
```

Dentro de la carpeta FiuFit ejecutar:

```shell
npm install 
```

## Antes de usar EAS, loggearse:
```shell
eas login
```

Debe crearse una cuenta en expo.dev.

Para chequear si ya estoy logeado (y si tengo instalado eas):
```shell
eas whoami
```
Debe aparecer tu cuenta personal y la organización de hanagotchi.

## Lanza la aplicación a producción (genera APK de producción)
```shell
eas build --profile production --platform android        
```

## Lanza la aplicación como desarrollador (genera APK de development)
```shell
eas build --profile development --platform android
```

**ATENCIÓN**: No es necesario lanzar la aplicación cada vez que se quiere iniciar.
Para descargar el apk de development, ir a la organizacion de hanagotchi en expo.dev y descargar el apk del ultimo build.

Con el APK de development generado podemos instalar la aplicación en nuestro dispositivo Android, y luego ejecutar el proyecto como desarrollado con comando:
```shell
npx expo start --dev-client
```

**Si se instala una nueva dependencia con npm o expo: se debe buildear de nuevo el APK de development y volver a instalarlo en el dispositivo Android.**