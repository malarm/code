import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationDk from "./translation/translationDk.json"
import translationEN from "./translation/translationEn.json"
import translationSe from "./translation/translationSe.json"

const fallbackLng = ["en"] as string[];
const availableLanguages = ["en", "dk", "se"] as string[];

const resources = {
	en: {
		translation: translationEN
	},

	dk: {
		translation: translationDk
	},

	se: {
		translation: translationSe
	}
};

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng,

		detection: {
			checkWhitelist: true
		},

		debug: false,

		whitelist: availableLanguages,

		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
