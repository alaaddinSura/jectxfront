import iso3166 from "iso-3166-1"

export const findCountry2Letter = countryCode =>{
  const country = iso3166.whereAlpha3(countryCode.toUpperCase())
  
  return country ? country.alpha2.toLowerCase() : null
}