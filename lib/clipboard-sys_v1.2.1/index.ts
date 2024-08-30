import darwinClipboard from './platform/darwin';
import linuxClipboard from './platform/linux';
import windowsClipboard from './platform/windows';

export default (() => {
    switch (process.platform) {
        case 'darwin':
            return darwinClipboard;
        case 'win32':
            return windowsClipboard;
        case 'linux':
            return linuxClipboard;
        default:
            return () => {
                throw new Error('unsupported os');
            }
    }
})()