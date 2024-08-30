import execa from 'execa';
import fs from 'fs';
import path from 'path';

export default async function (): Promise<Buffer> {
    let filepath = '';

    try {
        filepath = path.join(process.cwd(), 'temp.png');
        await fs.writeFile(filepath, Buffer.from([]), () => {});

        const { stderr } = await execa(
            `osascript`,
            ['-ss', path.join(__dirname, 'darwinScript', 'read_image.applescript'), filepath],
            {},
        );

        if (stderr)
            throw new Error(`cannot read image from clipboard error: ${stderr}`);

        // @ts-ignore
        return await fs.readFile(filepath);
    } catch (error: any) {
        throw new Error(error);
    } finally {
        try {
            if (fs.existsSync(filepath)) {
                await fs.unlink(filepath, () => {});
            }
        } catch {}
    }
}