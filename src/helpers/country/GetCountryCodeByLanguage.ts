export default function GetCountryCodeByLanguage(language:string) {

  if (language === "tr") return 'tur';
  if (language === "en") return 'usa';

  return 'language_not_found';

}