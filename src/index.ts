import { usePaddleOcr } from './hooks';
import { type ArgumentVector } from './shared';

export { default as locale } from './locale';

export default async function execute(argv: ArgumentVector) {
    const { _: commands, target: language } = argv;
    const [imagePath] = commands;

    return usePaddleOcr({ imagePath, language });
}

export { Language, type ArgumentVector } from './shared';
