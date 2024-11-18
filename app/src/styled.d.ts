/* eslint-disable @typescript-eslint/naming-convention */
import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    backdrop: string;
    black600: string;
    blue700: string;
    blue900: string;
    color: {
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
    };
    gray100: string;
    gray300: string;
    gray400: string;
    gray500: string;
    green600: string;
    orange700: string;
    primary300: string;
    red700: string;
    white100: string;
    white200: string;
    white900: string;
  }
}
