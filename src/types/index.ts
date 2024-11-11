export interface XlsxAutoJsonConfigProps {
    /** 翻译key前缀，若有自定义key，则不添加前缀 */
    initKey?: string
    /** 自动翻译为key的列索引 */
    contrastLangIndex: number
    /** 自定义key的列索引 */
    customizeKeyIndex?: number
    /** key生成规则，默认驼峰 */
    createKeyRule: 'camelCase' | 'splitWithLineThrough'


    /** 翻译转换文件地址(xlsx) */
    fromXlsxPath: string
    /** 翻译文案未找到时文案所在列索引 */
    defaultValueIndex: number

    /** 过滤掉从第一行到第xx行数据，默认为0，表示过滤第一行数据 */
    excludeRows?: number,

    translate: {
        /** 翻译语言 */
        targetLang: string
        /** 翻译语言在xlsx的index */
        targetIndex: number
        /** 导出文件路径 */
        outPath: string
    }[]
    /**
     * 未找到文案切默认替换文案也没有的标识
     * 方便你在文案中找到它
     */
    noFoundTest?: string


    /** 需要翻译的工作表（sheet）集合，不传会翻译全部工作表 */
    sheetNames?: string[]

}

