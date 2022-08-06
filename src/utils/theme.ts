export interface Theme {
    name: string;
    colors: {
        primary: string[];
        secondary: string[];
    },
    spacings: {
        tiny: string;
        xSmall: string;
        small: string;
        large: string;
        xLarge: string;
    }
}

const BASE_SPACING = 5;

const spacings = {
    tiny: `${BASE_SPACING}px`,
    xSmall: `${BASE_SPACING * 2}px`,
    small: `${BASE_SPACING * 3}px`,
    medium: `${BASE_SPACING * 6}px`,
    large: `${BASE_SPACING * 9}px`,
    xLarge: `${BASE_SPACING * 17}px`,
};

export const whiteTheme: Theme = {
    name: 'white',
    colors: {
        primary: ['#5964E0', '#939bf4', '#19202d', '#121721'],
        secondary: ['#ffffff', '#f4f6f8', '#6e8098', '#9daec2'],
    },
    spacings
};

export const darkTheme: Theme = {
    name: 'dark',
    colors: {
        primary: ['#5964E0', '#939bf4', '#ffffff', '#f4f6f8'],
        secondary: ['#19202d', '#121721', '#9daec2', '#6e8098'],
    },
    spacings
};