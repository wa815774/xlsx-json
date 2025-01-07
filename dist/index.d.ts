import { XlsxAutoJsonConfigProps } from "./types/index.js";
import { removeSpecialChars, removeExtraLineBreaks, splitWithLineThrough, toCamelCaseFromSpace } from './utils/tools.js';
declare const xlsxToJSON: (files?: string | string[]) => Promise<void>;
export default xlsxToJSON;
export { removeSpecialChars, removeExtraLineBreaks, splitWithLineThrough, toCamelCaseFromSpace };
export type { XlsxAutoJsonConfigProps };
