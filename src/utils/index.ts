import { XlsxAutoJsonConfigProps } from "../types/index.js"
import { toCamelCaseFromSpace, escapeSpecialChars, removeExtraLineBreaks, removeSpecialChars, processString, splitWithLineThrough } from "./tools.js";
import XLSX from 'xlsx';
import fs from 'fs';

/**
 * 获取xlsx数据
 * @param fromXlsxPath 
 * @returns 
 */
export const getXlsx = (path: string, sheetNames?: string[]): any[] => {
    const workbook = XLSX.readFile(path ?? '/');
    let allData: any[] = [];

    // console.log(workbook.SheetNames);

    // 遍历所有工作表
    (sheetNames ?? workbook.SheetNames).forEach(sheetName => {
        // 获取每个工作表
        const worksheet = workbook.Sheets[sheetName];

        // 将工作表转换为 JSON 对象
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        // console.log('sheetData==>', sheetData);

        // 将每个工作表的数据添加到数组中
        allData = allData.concat(sheetData);
    });

    return allData;
}

/**
 * 获取已有翻译json
 * @param config 
 * @returns 
 */
export const getTranslateMap = (config: XlsxAutoJsonConfigProps) => {
    const translateMap = config.translate?.map(item => ({
        ...item,
        map: new Map()
    }))

    translateMap.forEach(async (item, index) => {
        try {
            let jsonData: string = '{}'
            if (fs.existsSync(item.outPath)) {
                jsonData = fs.readFileSync(item.outPath, 'utf8');
            }

            const json = JSON.parse(jsonData ?? '{}');

            Object.entries(json).forEach(([key, value]) => {
                value = processString(value as string)?.trim() // 处理原来的 value 数据
                translateMap[index].map.set(key, value)
            })
        } catch (error) {
            console.error('Read JSON Error:', error);
        }
    })

    return translateMap
}

/**
 * 使用fs生成文件
 * @param {fs.PathOrFileDescriptor} url
 * @param {(string | NodeJS.ArrayBufferView)} text
 * @param {Lang} lang
 */
export const writeFile = (url: fs.PathOrFileDescriptor, text: string | NodeJS.ArrayBufferView, lang?: string) => {
    fs.writeFile(url, text, (err) => {
        if (err) {
            console.error('Error writing file:===>', err);
        } else {
            if (lang) {
                console.log(`${lang} 翻译完成====>`);
            }
        }
    });
}

export class TranslateItem {
    private _contrastLangIndex: XlsxAutoJsonConfigProps['contrastLangIndex']
    private _defaultValueIndex: XlsxAutoJsonConfigProps['defaultValueIndex']
    private _customizeKeyIndex: NonNullable<XlsxAutoJsonConfigProps['customizeKeyIndex']>
    private _initKey?: XlsxAutoJsonConfigProps['initKey']
    private _createKeyRule?: XlsxAutoJsonConfigProps['createKeyRule']

    constructor(props: Pick<XlsxAutoJsonConfigProps, 'contrastLangIndex' | 'defaultValueIndex' | 'customizeKeyIndex' | 'initKey' | 'createKeyRule'>) {
        this._initKey = props?.initKey
        this._contrastLangIndex = props.contrastLangIndex
        this._defaultValueIndex = props.defaultValueIndex
        this._customizeKeyIndex = props.customizeKeyIndex || -1
        this._createKeyRule = props.createKeyRule || 'camelCase'
    }

    /**
     * 分隔字符串
     * @param text 
     * @param reg 
     * @returns 
     */
    private _strToMap(text: string, reg = /\n+|\s{3,}/) {
        return String(text)?.split(reg)
    }

    public createLangMap(item: any[], config: ReturnType<typeof getTranslateMap>) {
        const valueList = item?.map(str => this._strToMap(str))
        const keyList = valueList[this._contrastLangIndex] ?? []
        const defaultList = valueList[this._defaultValueIndex]
        const rewriteMap = new Map()

        config.forEach(lang => {
            const value = valueList[lang.targetIndex]
            keyList?.forEach((key, index) => {
                let mapKey = valueList[this._customizeKeyIndex]?.[0]
                if (!mapKey) {
                    if (typeof this._createKeyRule === 'function') {
                        mapKey = this._createKeyRule(`${key}`?.trim())
                    }
                    else if (this._createKeyRule === 'splitWithLineThrough') {
                        mapKey = (this._initKey ?? '') + removeSpecialChars(removeExtraLineBreaks(
                            splitWithLineThrough(`${key}`?.trim())
                        ), true)
                    } else {
                        mapKey = (this._initKey ?? '') + removeSpecialChars(removeExtraLineBreaks(
                            toCamelCaseFromSpace(`${key}`?.trim())
                        ))
                    }
                }

                if (rewriteMap.has(mapKey)) {
                    console.log(`${mapKey} 重复了，值是 ${value}`)
                    // return // 允许覆盖
                }

                lang.map.set(
                    mapKey,
                    processString(value?.[index] ?? defaultList?.[index])?.trim()
                )
                rewriteMap.set(mapKey, 1)
            })
        })
    }
}

