import execa from 'execa';

export default async function (): Promise<Buffer> {
    const { stdout, stderr } = await execa('xclip -selection clipboard -t image/png -o | base64', { shell: true });

    if (stderr)
        throw new Error(`cannot read image from clipboard error: ${stderr}`);

    return Buffer.from(stdout, 'base64');
}