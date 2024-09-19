/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { XlsxAutoJsonConfigProps } from "../@types/index.js";
import fs from 'fs';
export declare const getXlsx: (path: string, sheetNames?: string[]) => any[];
export declare const getTranslateMap: (config: XlsxAutoJsonConfigProps) => {
    map: Map<any, any>;
    targetLang: string;
    targetIndex: number;
    outPath: string;
}[];
export declare const writeFile: (url: fs.PathOrFileDescriptor, text: string | NodeJS.ArrayBufferView, lang?: string) => void;
export declare class TranslateItem {
    private _contrastLangIndex;
    private _defaultValueIndex;
    private _initKey?;
    constructor(props: Pick<XlsxAutoJsonConfigProps, 'contrastLangIndex' | 'defaultValueIndex' | 'initKey'>);
    private _strToMap;
    createLangMap(item: any[], config: ReturnType<typeof getTranslateMap>): void;
}
