"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unconfig_1 = require("unconfig");
const index_js_1 = require("./utils/index.js");
const tools_js_1 = require("./utils/tools.js");
(async () => {
    const { config } = await (0, unconfig_1.loadConfig)({
        sources: [
            {
                files: 'translate.config',
                extensions: ['ts', 'js']
            }
        ]
    });
    const xlsx = (0, tools_js_1.filterArray)((0, index_js_1.getXlsx)(config.fromXlsxPath, config.sheetNames));
    const translateMap = (0, index_js_1.getTranslateMap)(config);
    const translateItem = new index_js_1.TranslateItem({
        initKey: config.initKey,
        contrastLangIndex: config.contrastLangIndex,
        defaultValueIndex: config.defaultValueIndex,
    });
    xlsx.forEach((item, index) => {
        translateItem.createLangMap(item, translateMap);
    });
    translateMap.forEach(translate => {
        const list = Array.from(translate.map);
        const text = list.map(([key, value], index) => {
            if (typeof value === 'undefined') {
                console.log(`${translate.targetLang}: ${key} ==== undefined`);
            }
            return `  "${key}": "${typeof value === 'undefined' ? config.noFoundTest : value}"${index === (list?.length - 1) ? '' : ','}`;
        }).join('\n');
        (0, index_js_1.writeFile)(translate.outPath, `{\n${text}\n}`, translate.targetLang);
    });
})();
//# sourceMappingURL=index.js.map