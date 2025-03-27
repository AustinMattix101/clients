export { default as getLoadingMarkup} from "./getLoadingMarkup";
export { default as Languages} from "./LanguageComponent";
export { default as MenuItems} from "./MenuItems";
export { default as LanguagesItems} from "./LanguagesItems";
export { default as VideoBackground} from "./VideoBackground";

export interface IAlert {
    data: {
      success: boolean;
      status: string;
      message?: string;
      error?: string;
      data: {
        username?: string;
        email?: string;
      };
    };
    statusCode?: number;
  }

export interface ILanguage {
    language: {
      code: string;
      dir: string;
      name: string;
      country_code: string;
    }[];
  }