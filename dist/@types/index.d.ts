export interface XlsxAutoJsonConfigProps {
    initKey?: string;
    fromXlsxPath: string;
    contrastLangIndex: number;
    defaultValueIndex: number;
    translate: {
        targetLang: string;
        targetIndex: number;
        outPath: string;
    }[];
    noFoundTest?: string;
    sheetNames?: string[];
}
