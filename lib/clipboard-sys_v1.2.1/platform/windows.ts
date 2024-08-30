import execa from 'execa';
import path from 'path';

export default async function (): Promise<Buffer> {
    let result;

    try {
        result = await execa(`${path.join(__dirname, '..', 'bin', 'win_clipboard.exe')}`, ['--readImage']);
    } catch {
        result = await execa(
            `powershell -Command Add-Type -AssemblyName System.Windows.Forms; "$clip=[Windows.Forms.Clipboard]::GetImage();if ($clip -ne $null) { $converter = New-Object -TypeName System.Drawing.ImageConverter;$byte_vec = $converter.ConvertTo($clip, [byte[]]); $EncodedText =[Convert]::ToBase64String($byte_vec); return $EncodedText }"`,
        );
    }

    if (result && 'stderr' in result && result.stderr)
        throw new Error(`cannot read image from clipboard error: ${result.stderr}`);

    return Buffer.from(result.stdout, 'base64');
}