import { XlsxAutoJsonConfigProps } from "../@types";
export declare const defineConfig: (config: XlsxAutoJsonConfigProps) => XlsxAutoJsonConfigProps;
export declare const escapeSpecialChars: (inputString: string) => string;
export declare const removeSpecialChars: (str: string) => string;
export declare const filterArray: (array: any[]) => any[];
export declare function toCamelCaseFromSpace(str: string): string;
export declare function removeExtraLineBreaks(input: string): string;
export declare const processString: (inputString: string) => string;
