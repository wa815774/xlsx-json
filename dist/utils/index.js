"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateItem = exports.writeFile = exports.getTranslateMap = exports.getXlsx = void 0;
const tools_js_1 = require("./tools.js");
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const getXlsx = (path, sheetNames) => {
    const workbook = xlsx_1.default.readFile(path ?? '/');
    let allData = [];
    (sheetNames ?? workbook.SheetNames).forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const sheetData = xlsx_1.default.utils.sheet_to_json(worksheet, { header: 1 });
        allData = allData.concat(sheetData);
    });
    return allData;
};
exports.getXlsx = getXlsx;
const getTranslateMap = (config) => {
    const translateMap = config.translate?.map(item => ({
        ...item,
        map: new Map()
    }));
    translateMap.forEach(async (item, index) => {
        try {
            const jsonData = fs_1.default.readFileSync(item.outPath, 'utf8');
            const json = JSON.parse(jsonData ?? '{}');
            Object.entries(json).forEach(([key, value]) => {
                value = (0, tools_js_1.processString)(value)?.trim();
                translateMap[index].map.set(key, value);
            });
        }
        catch (error) {
            console.error('Read JSON Error:', error);
        }
    });
    return translateMap;
};
exports.getTranslateMap = getTranslateMap;
const writeFile = (url, text, lang) => {
    fs_1.default.writeFile(url, text, (err) => {
        if (err) {
            console.error('Error writing file:===>', err);
        }
        else {
            if (lang) {
                console.log(`${lang} 翻译完成====>`);
            }
        }
    });
};
exports.writeFile = writeFile;
class TranslateItem {
    constructor(props) {
        this._initKey = props?.initKey;
        this._contrastLangIndex = props.contrastLangIndex;
        this._defaultValueIndex = props.defaultValueIndex;
    }
    _strToMap(text, reg = /\n+|\s{3,}/) {
        return String(text)?.split(reg);
    }
    createLangMap(item, config) {
        const valueList = item?.map(str => this._strToMap(str));
        const keyList = valueList[this._contrastLangIndex] ?? [];
        const defaultList = valueList[this._defaultValueIndex];
        config.forEach(lang => {
            const value = valueList[lang.targetIndex];
            keyList?.forEach((key, index) => {
                const mapKey = (0, tools_js_1.removeSpecialChars)((0, tools_js_1.removeExtraLineBreaks)((0, tools_js_1.toCamelCaseFromSpace)(`${this._initKey}${key}`?.trim())));
                lang.map.set(mapKey, (0, tools_js_1.processString)(value?.[index] ?? defaultList?.[index])?.trim());
            });
        });
    }
}
exports.TranslateItem = TranslateItem;
//# sourceMappingURL=index.js.map