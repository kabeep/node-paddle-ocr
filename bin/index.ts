#!/usr/bin/env node
import readline from 'node:readline';
import ora from 'ora';
import OCR from 'paddleocrjson';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import execute, { type ArgumentVector, Language, locale } from '../src';

// region > Registry commander
const argv = yargs(hideBin(process.argv))
    .scriptName('ocr')
    .usage(locale.CMD_DSE_USAGE)
    .options('target', {
        alias: 't',
        type: 'string',
        desc: locale.CMD_DES_LANGUAGE,
    })
    .options('code', {
        alias: 'c',
        type: 'boolean',
        desc: locale.CMD_DES_CODE,
    })
    .alias({
        v: 'version',
        h: 'help',
    })
    .example('$ ocr', locale.CMD_DES_EXAMPLE_CLIPBOARD)
    .example('$ ocr ./image.png', locale.CMD_DES_EXAMPLE_FILE)
    .parse() as ArgumentVector;

if (argv.code) {
    for (const prop in Language) {
        console.log(`- ${prop}: ${Language[prop as keyof typeof Language]}`);
    }
    process.exit(0);
}
// endregion

// region > Fixes issue from `ora` that cursor is hidden after process break off
if (process.platform === 'win32') {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('SIGINT', function () {
        process.emit('SIGINT');
    });
}
process.on('SIGINT', function () {
    spinner.fail(locale.CMD_ERR_SIGINT);
    process.exit(0);
});
// endregion

// region > OCR process
const spinner = ora({ text: locale.CMD_SPIN_PROGRESS, color: 'cyan' }).start();
execute(argv)
    .then((res: OCR.coutReturnType['data']) => {
        spinner.stop();
        printResult(res);
    })
    .catch((error: Error) => {
        spinner.fail(` ${error.message}`);
    })
    .finally(() => {
        process.exit();
    });

function printResult(res: OCR.coutReturnType['data']) {
    for (const item of (
        res || []
    )) {
        console.log(`- ${item.text}`);
        console.log(`  score: ${item.score.toFixed(2)}\n`);
    }
}

// endregion
