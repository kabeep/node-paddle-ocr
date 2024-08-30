import fs from 'node:fs';
import path from 'node:path';
import OCR from 'paddleocrjson';
import { ROOT_PATH } from '../constants';
import locale from '../locale';
import { getLanguageConfigPath, isImage } from '../utils';
import useClipboardImage from './use-clipboard-image';
import useThrower from './use-thrower';

const paddleOcrFilename = 'PaddleOCR-json.exe';
const paddleOcrDirectoryName = 'PaddleOCR-json_v1.4.0';

export interface UsePaddleOcrOption {
    imagePath?: string;
    language?: string;
}

export default async function usePaddleOcr({ imagePath, language }: UsePaddleOcrOption) {
    const ocr = createOcr(language);
    const option = await getOption(imagePath);

    const { code, message, data } = await ocr.flush(option);
    await ocr.terminate();

    useThrower(message, code !== 100);
    return data;
}

function createOcr(language: UsePaddleOcrOption['language']): OCR {
    const directory = path.resolve(ROOT_PATH, 'lib', paddleOcrDirectoryName);
    // Console.log(ROOT_PATH);
    const filepath = path.resolve(directory, paddleOcrFilename);
    // Check if the executable file does not exist
    useThrower(locale.CMD_ERR_MISSING_OCR, !fs.existsSync(filepath));

    // Start OCR worker
    return new OCR(
        filepath,
        getConfig(language),
        {
            cwd: directory,
        },
        false,
    );
}

function getConfig(language: UsePaddleOcrOption['language']) {
    const arguments_: string[] = [
        /* '-port=9985', '-addr=loopback' */
    ];
    if (language) {
        const configPath = getLanguageConfigPath(language);
        // Check if unsupported language
        useThrower(locale.CMD_ERR_INVALID_LANGUAGE, !configPath);
        // Check if the config file does not exist
        useThrower(locale.CMD_ERR_MISSING_CONFIG, !fs.existsSync(configPath!));

        arguments_.push(`-config_path=${configPath}`);
    }

    return arguments_;
}

async function getOption(imagePath?: string): Promise<OCR.Arg> {
    const option: OCR.Arg & { image_base64?: string; image_path?: string } = {};
    if (imagePath) {
        // > Use file
        const imageFullPath = path.resolve(imagePath);
        // Check if the image file does not exist
        useThrower(locale.CMD_ERR_INVALID_FILE, !fs.existsSync(imageFullPath));
        // Check if the file is not an image
        useThrower(locale.CMD_ERR_INVALID_IMAGE, !isImage(imagePath));
        option.image_path = imageFullPath;
    } else {
        // > Use clipboard
        const imageBuffer = await useClipboardImage(true);
        const imageBase64 = imageBuffer.toString('base64');
        // Check if the latest clipboard is not an image
        useThrower(locale.CMD_ERR_MISSING_CLIPBOARD, !imageBase64);
        option.image_base64 = imageBase64;
    }

    return option;
}
