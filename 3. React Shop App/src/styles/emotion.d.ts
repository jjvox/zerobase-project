import "@emotion/react";
import { theme } from "./theme";

declare module "@emotion/react" {
  export interface Theme {
    [key: string]: {
      [key: string]: string;
    };
  }
}
