import { languageState } from "atom";
import { useRecoilValue } from "recoil";
import TRANSLATIONS from "constants/language";

export default function useTranslation() {
  const lang = useRecoilValue(languageState);

  return (key: keyof typeof TRANSLATIONS) => {
    return TRANSLATIONS[key][lang];
  };
}
