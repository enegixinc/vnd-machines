import { i18n } from '@/i18n';
export const getTranslation = (key: string) => {
    return i18n.global.t(key);
};
