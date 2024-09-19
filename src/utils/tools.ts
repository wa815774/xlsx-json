import { XlsxAutoJsonConfigProps } from "../@types";

/**
 * 配置文件
 * @param config 
 * @returns 
 */
export const defineConfig = (config: XlsxAutoJsonConfigProps) => config

/**
 * 添加转义字符
 * @param str 
 * @returns 
 */
export const escapeSpecialChars = (inputString: string): string => {
    return inputString.replace(/(["{}])/g, '\\$1');
}

/**
 * 删除转义字符
 * @param str 
 * @returns 
 */
export const removeSpecialChars = (str: string): string => {
    const specialCharacters = /[-\/\\^$*+?,():|[\]{}"]/g;
    const result = str?.replace(specialCharacters, "");
    return result;
}


/**
 * 去除空数组
 * @param array 
 * @returns 
 */
export const filterArray = (array: any[]) => {
    return array?.filter((item) => Array.isArray(item) && item.length > 0)
}

/**
 * 转换为首字母大写并去除空格key
 * @param str 
 * @returns 
 */
export function toCamelCaseFromSpace(str: string) {
    if (!str) return ''
    str = str.replace(/\s+(.)/g, (_, c) => c.toUpperCase());
    // return str[0].toUpperCase() + str.slice(1)
    return str
}

/**
 * 去除多余的回车
 * @param input 
 * @returns 
 */
export function removeExtraLineBreaks(input: string): string {
    // return input?.replace(/(\r\n|\n|\r)+/g, '\n');
    return input?.replace(/\s+/g, '');
}

/**
 * 处理字符串，添加转义字符并去除多余的回车
 * @param str 输入字符串
 * @returns 处理后的字符串
 */
export const processString = (inputString: string): string => {
    // 添加转义字符
    const stringWithEscapedChars = inputString
    // 转义 “
    ?.replace(/(["])/g, '\\$1')
    // 去掉 /' 替换成 ‘(这个本来是能正常显示的，但是编辑器在json文件中要报错)
    ?.replace(/\\'/g, "'");

    // 去除多余的回车
    const stringWithoutExtraLineBreaks = stringWithEscapedChars?.replace(/(\r\n|\n|\r)+/g, '\n');

    return stringWithoutExtraLineBreaks;
};