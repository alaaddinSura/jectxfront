export const findStrNbr = number => {
  
  return number >= 1000000 ?  String(Math.round(number / 100000)) / 10 + 'M' : number >=1000 && number < 1000000 ? String(Math.round(number/100)) / 10 + 'K' : String(number)
}
