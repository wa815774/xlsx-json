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
import { loadConfig } from "unconfig";
import { TranslateItem, getTranslateMap, getXlsx, writeFile } from "./utils/index.js";
import { filterArray, removeSpecialChars, removeExtraLineBreaks, splitWithLineThrough, toCamelCaseFromSpace } from './utils/tools.js';
var xlsxToJSON = (function (files) {
    if (files === void 0) { files = 'translate.config'; }
    return __awaiter(void 0, void 0, void 0, function () {
        var config, xlsx, translateMap, translateItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadConfig({
                        sources: [
                            {
                                files: files,
                                // extensions: ['ts', 'js']
                            }
                        ]
                    })
                    // console.log(`config`, config);
                ];
                case 1:
                    config = (_a.sent()).config;
                    xlsx = filterArray(getXlsx(config.fromXlsxPath, config.sheetNames));
                    translateMap = getTranslateMap(config);
                    translateItem = new TranslateItem(config);
                    xlsx.forEach(function (item, index) {
                        if (+(config.excludeRows || 0) < index) {
                            translateItem.createLangMap(item, translateMap);
                        }
                    });
                    // 打印并写出
                    translateMap.forEach(function (translate) {
                        var list = Array.from(translate.map);
                        var text = list.map(function (_a, index) {
                            var key = _a[0], value = _a[1];
                            if (typeof value === 'undefined') {
                                console.log("".concat(translate.targetLang, ": ").concat(key, " ==== undefined"));
                            }
                            if (value.indexOf('\n') > -1) {
                                // 若文案中有换行符，需要保留
                                value = value.replaceAll('\n', '\\n');
                            }
                            return "  \"".concat(key, "\": \"").concat(typeof value === 'undefined' ? config.noFoundTest : value, "\"").concat(index === ((list === null || list === void 0 ? void 0 : list.length) - 1) ? '' : ',');
                        }).join('\n');
                        writeFile(translate.outPath, "{\n".concat(text, "\n}"), translate.targetLang);
                    });
                    return [2 /*return*/];
            }
        });
    });
});
export default xlsxToJSON;
export { removeSpecialChars, removeExtraLineBreaks, splitWithLineThrough, toCamelCaseFromSpace };
