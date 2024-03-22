const PRIMARY_COLOR = '#689278';
const PRIMARY_COLOR_DARK = '#3D5948';
const PRIMARY_COLOR_LIGHT = '#C4DECE';
const SECONDARY_COLOR = '#E8DECF';
const SECONDARY_COLOR_DARK = '#DBD5CC';
const SECONDARY_COLOR_LIGHT = '#FEF7ED';
const ERROR_COLOR = '#BB3D3C';
const ERROR_DARK = '#892322';
const ERROR_LIGHT = '#E9B5B5';

export const globalTheme = {
    pallete: {
        primary: {
            main: PRIMARY_COLOR,
            dark: PRIMARY_COLOR_DARK,
            light: PRIMARY_COLOR_LIGHT,
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
                dark: "#4F4C4F",
                light: "#FEF7ED"
            }
        }
    }
}