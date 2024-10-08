export interface XlsxAutoJsonConfigProps {
    /** 翻译文案拼接key */
    initKey?: string;
    /** 翻译转换文件地址(xlsx) */
    fromXlsxPath: string;
    /** 默认对比项语言 */
    contrastLangIndex: number;
    /** 翻译文案未找到时默认文案 */
    defaultValueIndex: number;
    /** 过滤掉从第一排到第xx排数据，默认为0，表示过滤第一排数据 */
    excludeRows: number;
    translate: {
        /** 翻译语言 */
        targetLang: string;
        /** 翻译语言在xlsx的index */
        targetIndex: number;
        /** 导出文件路径 */
        outPath: string;
    }[];
    /**
     * 未找到文案切默认替换文案也没有的标识
     * 方便你在文案中找到它
     */
    noFoundTest?: string;
    /** 需要翻译的工作表（sheet）集合，不传会翻译全部工作表 */
    sheetNames?: string[];
}
