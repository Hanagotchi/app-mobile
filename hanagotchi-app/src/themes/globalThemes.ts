import {
    MD3LightTheme as DefaultTheme, MD3Theme,
} from 'react-native-paper';

export const BACKGROUND_COLOR = "#FEF7ED";
export const GREEN = '#689278';
export const GREEN_DARK = '#3D5948';
export const GREEN_LIGHT = '#C4DECE';
export const BEIGE = '#E8DECF';
export const BEIGE_DARK = '#DBD5CC';
export const BEIGE_LIGHT = '#FEF7ED';
export const BROWN = '#694F31';
export const BROWN_DARK = '#41311F';
export const BROWN_LIGHT = '#AC957B';
export const RED = '#BB3D3C';
export const RED_DARK = '#892322';
export const RED_LIGHT = '#E9B5B5';
export const DARK_TEXT = "#4F4C4F";
export const BLACK = "#1C1B1C";
export const GREY = "#4F4C4F";
export const GREY_LIGHT = "grey";

/* export const globalTheme = {
    pallete: {
        background: BACKGROUND_COLOR,
        primary: {
            main: GREEN,
            dark: GREEN_DARK,
            light: GREEN_LIGHT,
        },
        secondary: {
            main: SECONDARY_COLOR,
            dark: SECONDARY_COLOR_DARK,
            light: SECONDARY_COLOR_LIGHT,
        },
        error: {
            main: ERROR_COLOR,
            dark: ERROR_DARK,
            light: ERROR_LIGHT,
        }
    },
    components: {
        button: {
            size: {
                small: 40,
                medium: 50,
                big: 60,
            },
            color: {
                primary: PRIMARY_COLOR,
                secondary: SECONDARY_COLOR_DARK,
                error: ERROR_COLOR,
            }

        },
        text: {
            size: {
                small: 15,
                medium: 18,
                big: 21,
            },
            color: {
                dark: DARK_TEXT,
                light: SECONDARY_COLOR_LIGHT
            }
        }
    }
} */

export const theme: MD3Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: BACKGROUND_COLOR,
        primary: GREEN,
        onPrimary: BEIGE_LIGHT,
        secondary: BEIGE_DARK,
        onSecondary: DARK_TEXT,
        tertiary: BROWN_LIGHT,
        onTertiary: BEIGE_LIGHT,
        error: RED,
        onError: BEIGE_LIGHT
    },
}