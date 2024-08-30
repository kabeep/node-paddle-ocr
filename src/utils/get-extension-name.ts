import path from 'node:path';

/**
 * Get extension name of input filepath
 * @param {string} filepath - input filepath
 * @returns {string}
 * @example
 * // => png
 * getExtensionName('./image.PNG')
 *
 * // => js
 * getExtensionName('./test/utils/get-extension-name.js')
 */
export default function getExtensionName(filepath: string) {
    return path.extname(filepath).replace(/^./, '').toLowerCase();
}
