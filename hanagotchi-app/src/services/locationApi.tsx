import env from "../environment/loader";

async function getAddressFromCoordinates(
    latitude: number,
    longitude: number,
) {
    
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apiKey=${env.revGeoCodeApiKey}`;
    const defaultResponse = latitude.toFixed(2) + ", " + longitude.toFixed(2);

    try {
        const response = await fetch(url);
        const resJson = await response.json();
        if (
            resJson &&
            resJson.items &&
            resJson.items[0].address &&
            resJson.items[0].address.city &&
            resJson.items[0].address.countryName
        ) {
            console.log(resJson.items[0]);
            const locationName = resJson.items[0].address.city + ", " + resJson.items[0].address.state + ", " + resJson.items[0].address.countryName;
            return locationName ?? defaultResponse;
        } else {
            return defaultResponse;
        }
    } catch (error) {
        return defaultResponse;
    }
}

export default getAddressFromCoordinates;