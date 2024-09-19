"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processString = exports.removeExtraLineBreaks = exports.toCamelCaseFromSpace = exports.filterArray = exports.removeSpecialChars = exports.escapeSpecialChars = exports.defineConfig = void 0;
const defineConfig = (config) => config;
exports.defineConfig = defineConfig;
const escapeSpecialChars = (inputString) => {
    return inputString.replace(/(["{}])/g, '\\$1');
};
exports.escapeSpecialChars = escapeSpecialChars;
const removeSpecialChars = (str) => {
    const specialCharacters = /[-\/\\^$*+?,():|[\]{}"]/g;
    const result = str?.replace(specialCharacters, "");
    return result;
};
exports.removeSpecialChars = removeSpecialChars;
const filterArray = (array) => {
    return array?.filter((item) => Array.isArray(item) && item.length > 0);
};
exports.filterArray = filterArray;
function toCamelCaseFromSpace(str) {
    if (!str)
        return '';
    str = str.replace(/\s+(.)/g, (_, c) => c.toUpperCase());
    return str;
}
exports.toCamelCaseFromSpace = toCamelCaseFromSpace;
function removeExtraLineBreaks(input) {
    return input?.replace(/\s+/g, '');
}
exports.removeExtraLineBreaks = removeExtraLineBreaks;
const processString = (inputString) => {
    const stringWithEscapedChars = inputString
        ?.replace(/(["])/g, '\\$1')
        ?.replace(/\\'/g, "'");
    const stringWithoutExtraLineBreaks = stringWithEscapedChars?.replace(/(\r\n|\n|\r)+/g, '\n');
    return stringWithoutExtraLineBreaks;
};
exports.processString = processString;
//# sourceMappingURL=tools.js.map