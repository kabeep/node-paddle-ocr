import getExtensionName from './get-extension-name';

const imageMimeType = new Set(['bmp', 'jpeg', 'png', 'pbm', 'pgm', 'ppm', 'ras', 'tiff', 'exr', 'jp2']);

/**
 * Check filepath is an image
 * @param {string} filepath - input filepath
 * @returns {boolean}
 * @example
 * // => true
 * isImage('./image.png')
 *
 * // => false
 * isImage('./index.js')
 */
export default function isImage(filepath: string) {
    const fileExtension = getExtensionName(filepath);

    return imageMimeType.has(fileExtension);
}
