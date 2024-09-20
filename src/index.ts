import { loadConfig } from "unconfig"
import { XlsxAutoJsonConfigProps } from "./@types/index.js";
import { TranslateItem, getTranslateMap, getXlsx, writeFile } from "./utils/index.js";
import { filterArray } from './utils/tools.js';

const xlsxToJSON = (async (files: string | string[] = 'translate.config') => {
    const { config } = await loadConfig<XlsxAutoJsonConfigProps>({
        sources: [
            {
                files: files,
                // extensions: ['ts', 'js']
            }
        ]
    })
    // console.log(`config`, config);

    const xlsx = filterArray(getXlsx(config.fromXlsxPath, config.sheetNames))
    const translateMap = getTranslateMap(config)

    const translateItem = new TranslateItem({
        initKey: config.initKey,
        contrastLangIndex: config.contrastLangIndex,
        defaultValueIndex: config.defaultValueIndex,
    })

    xlsx.forEach((item, index) => {
        if (+(config.excludeRows || 0) < index) {
            translateItem.createLangMap(item, translateMap)
        }
    })

    // 打印并写出
    translateMap.forEach(translate => {
        const list = Array.from(translate.map)

        const text = list.map(([key, value], index) => {
            if (typeof value === 'undefined') {
                console.log(`${translate.targetLang}: ${key} ==== undefined`);
            }
            return `  "${key}": "${typeof value === 'undefined' ? config.noFoundTest : value}"${index === (list?.length - 1) ? '' : ','}`
        }).join('\n')

        writeFile(translate.outPath, `{\n${text}\n}`, translate.targetLang)
    })
})

export default xlsxToJSON