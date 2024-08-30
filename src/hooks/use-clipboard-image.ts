import readImage from '../../lib/clipboard-sys_v1.2.1';

export default async function useClipboardImage(base64 = false) {
    return readImage();
}
