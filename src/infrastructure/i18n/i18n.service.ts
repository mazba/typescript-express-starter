import i18next from 'i18next';
import { injectable } from 'tsyringe';
import { appConfig } from '../../config/app.config';

@injectable()
export class I18nService {
  constructor() {
    this.initializeI18n();
  }

  private async initializeI18n(): Promise<void> {
    await i18next.init({
      lng: appConfig.i18n.defaultLocale,
      fallbackLng: appConfig.i18n.defaultLocale,
      supportedLngs: appConfig.i18n.availableLocales,
      ns: ['common', 'errors', 'validation'],
      defaultNS: 'common',
      backend: {
        loadPath: 'src/infrastructure/i18n/locales/{{lng}}/{{ns}}.json'
      }
    });
  }

  translate(key: string, options?: any): string {
    const result = i18next.t(key, options);
    return typeof result === 'string' ? result : key;
  }

  changeLanguage(language: string): void {
    i18next.changeLanguage(language);
  }
}