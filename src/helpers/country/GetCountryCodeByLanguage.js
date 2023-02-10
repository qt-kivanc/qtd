export default function GetCountryCodeByLanguage(language) {

  if (language === "tr") return 'tur';
  if (language === "en") return 'usa';

  return 'language_not_found';

}