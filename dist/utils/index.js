var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { toCamelCaseFromSpace, removeExtraLineBreaks, removeSpecialChars, processString, splitWithLineThrough } from "./tools.js";
import XLSX from 'xlsx';
import fs from 'fs';
/**
 * 获取xlsx数据
 * @param fromXlsxPath
 * @returns
 */
export var getXlsx = function (path, sheetNames) {
    var workbook = XLSX.readFile(path !== null && path !== void 0 ? path : '/');
    var allData = [];
    // console.log(workbook.SheetNames);
    // 遍历所有工作表
    (sheetNames !== null && sheetNames !== void 0 ? sheetNames : workbook.SheetNames).forEach(function (sheetName) {
        // 获取每个工作表
        var worksheet = workbook.Sheets[sheetName];
        // 将工作表转换为 JSON 对象
        var sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        // console.log('sheetData==>', sheetData);
        // 将每个工作表的数据添加到数组中
        allData = allData.concat(sheetData);
    });
    return allData;
};
/**
 * 获取已有翻译json
 * @param config
 * @returns
 */
export var getTranslateMap = function (config) {
    var _a;
    var translateMap = (_a = config.translate) === null || _a === void 0 ? void 0 : _a.map(function (item) { return (__assign(__assign({}, item), { map: new Map() })); });
    translateMap.forEach(function (item, index) { return __awaiter(void 0, void 0, void 0, function () {
        var jsonData, json;
        return __generator(this, function (_a) {
            try {
                jsonData = '{}';
                if (fs.existsSync(item.outPath)) {
                    jsonData = fs.readFileSync(item.outPath, 'utf8');
                }
                json = JSON.parse(jsonData !== null && jsonData !== void 0 ? jsonData : '{}');
                Object.entries(json).forEach(function (_a) {
                    var _b;
                    var key = _a[0], value = _a[1];
                    value = (_b = processString(value)) === null || _b === void 0 ? void 0 : _b.trim(); // 处理原来的 value 数据
                    translateMap[index].map.set(key, value);
                });
            }
            catch (error) {
                console.error('Read JSON Error:', error);
            }
            return [2 /*return*/];
        });
    }); });
    return translateMap;
};
/**
 * 使用fs生成文件
 * @param {fs.PathOrFileDescriptor} url
 * @param {(string | NodeJS.ArrayBufferView)} text
 * @param {Lang} lang
 */
export var writeFile = function (url, text, lang) {
    fs.writeFile(url, text, function (err) {
        if (err) {
            console.error('Error writing file:===>', err);
        }
        else {
            if (lang) {
                console.log("".concat(lang, " \u7FFB\u8BD1\u5B8C\u6210====>"));
            }
        }
    });
};
var TranslateItem = /** @class */ (function () {
    function TranslateItem(props) {
        this._initKey = props === null || props === void 0 ? void 0 : props.initKey;
        this._contrastLangIndex = props.contrastLangIndex;
        this._defaultValueIndex = props.defaultValueIndex;
        this._customizeKeyIndex = props.customizeKeyIndex || -1;
        this._createKeyRule = props.createKeyRule || 'camelCase';
    }
    /**
     * 分隔字符串
     * @param text
     * @param reg
     * @returns
     */
    TranslateItem.prototype._strToMap = function (text, reg) {
        var _a;
        if (reg === void 0) { reg = /\n+|\s{3,}/; }
        return (_a = String(text)) === null || _a === void 0 ? void 0 : _a.split(reg);
    };
    TranslateItem.prototype.createLangMap = function (item, config) {
        var _this = this;
        var _a;
        var valueList = item === null || item === void 0 ? void 0 : item.map(function (str) { return _this._strToMap(str); });
        var keyList = (_a = valueList[this._contrastLangIndex]) !== null && _a !== void 0 ? _a : [];
        var defaultList = valueList[this._defaultValueIndex];
        var rewriteMap = new Map();
        config.forEach(function (lang) {
            var value = valueList[lang.targetIndex];
            keyList === null || keyList === void 0 ? void 0 : keyList.forEach(function (key, index) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                var mapKey = (_a = valueList[_this._customizeKeyIndex]) === null || _a === void 0 ? void 0 : _a[0];
                if (!mapKey) {
                    if (typeof _this._createKeyRule === 'function') {
                        mapKey = _this._createKeyRule((_b = "".concat(key)) === null || _b === void 0 ? void 0 : _b.trim());
                    }
                    else if (_this._createKeyRule === 'splitWithLineThrough') {
                        mapKey = ((_c = _this._initKey) !== null && _c !== void 0 ? _c : '') + removeSpecialChars(removeExtraLineBreaks(splitWithLineThrough((_d = "".concat(key)) === null || _d === void 0 ? void 0 : _d.trim())), true);
                    }
                    else {
                        mapKey = ((_e = _this._initKey) !== null && _e !== void 0 ? _e : '') + removeSpecialChars(removeExtraLineBreaks(toCamelCaseFromSpace((_f = "".concat(key)) === null || _f === void 0 ? void 0 : _f.trim())));
                    }
                }
                if (rewriteMap.has(mapKey)) {
                    console.log("".concat(mapKey, " \u91CD\u590D\u4E86\uFF0C\u503C\u662F ").concat(value));
                    // return // 允许覆盖
                }
                lang.map.set(mapKey, (_h = processString((_g = value === null || value === void 0 ? void 0 : value[index]) !== null && _g !== void 0 ? _g : defaultList === null || defaultList === void 0 ? void 0 : defaultList[index])) === null || _h === void 0 ? void 0 : _h.trim());
                rewriteMap.set(mapKey, 1);
            });
        });
    };
    return TranslateItem;
}());
export { TranslateItem };
