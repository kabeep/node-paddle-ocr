import osLocale from 'os-locale';

import enUS from './en-US';
import zhCN from './zh-CN';

function getLocale() {
    const locale = osLocale.sync().split('-')[0];

    switch (locale) {
        case 'zh': {
            return zhCN;
        }

        default: {
            return enUS;
        }
    }
}

export default getLocale();
