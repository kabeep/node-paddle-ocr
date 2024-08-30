import path from 'node:path';
import { ROOT_PATH } from '../constants';

const languageConfigs = new Map([
    ['CN', 'config_chinese.txt'],
    ['HK', 'config_chinese_cht.txt'],
    ['EN', 'config_en.txt'],
    ['RU', 'config_cyrillic.txt'],
    ['JA', 'config_japan.txt'],
    ['KO', 'config_korean.txt'],
    ['FR', 'config_french_v2.txt'],
    ['DE', 'config_german_v2.txt'],
]);

const paddleOcrDirectoryName = 'PaddleOCR-json_v1.4.0';

export default function getLanguageConfigPath(code: string) {
    const filename = languageConfigs.get(code.toUpperCase());
    if (!filename) return;

    return path.resolve(ROOT_PATH, 'lib', paddleOcrDirectoryName, 'models', filename);
}
