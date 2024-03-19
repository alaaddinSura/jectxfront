export const config = (url, data) => {
  let resConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return resConfig;
}

export const yatakDagilimConfig = (dateRange, hotelidArray) => {
  let url = "https://jectxbackend-672789bf3678.herokuapp.com/yatakdagilim"

  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)

}

export const gecelemeDagilimConfig = (dateRange, hotelidArray) => {
  let url = "https://jectxbackend-672789bf3678.herokuapp.com/gecelemedagilim"

  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const rezervMiktariConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/rezmiktari";

  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}


export const kanallaraRezDagilimConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/kanalrezdagilim";

  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const onlineRezervMiktariConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/onlrezmiktari";
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const gecelemeMiktariConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/gecelemiktarlari";
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const ayDolulukConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/gecelemiktarlari";
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const haftaDolulukConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/gecelemiktarlari";
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const sonYediAyDolulukConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/gecelemiktarlari";
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const ulkeDagilimConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/ulkedagilim"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const callGecmisRezConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/gecmisRezervasyonlar"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const rezAnalizConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/rezAnaliz"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const iptalAnalizConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/iptalAnaliz"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const iptalEdebilirAnalizConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/iptalEdilebilirAnalizAylik"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const iptalEdebilirAnalizConfigGunluk = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/iptalEdilebilirAnaliz"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const gecmisRezervasyonDagilimConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/doluluk"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const odaTipiDagilimConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/odatipidagilim"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const dolulukGelecekRezConfig = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/dolulukaylik"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const callRezervasyonGecmisGunluk = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/rezervasyonkarsilastirma"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const callRezervasyonGecmisAylik = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/rezervasyonkarsilastirmaAylik"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const callChannelTable = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/kanallaragoretablo"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const callRawData = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/rawdatatablo"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}


export const callKanalDagilimGelir = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/kanaldagilimgelir"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data) 
}

export const callKazancTakip = (dateRange, hotelidArray) => {
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/kazanctakip"
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const callKazancTakipAylik = (dateRange, hotelidArray) => {
  const url = 'https://jectxbackend-672789bf3678.herokuapp.com/kazanctakipAylik';
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const kanalDagilimGelirlerconfig = (dateRange, hotelidArray) => {
  const url = 'https://jectxbackend-672789bf3678.herokuapp.com/kanaldagilimgelir';
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}


export const callHaftalikGecmisKarsilastirma = (dateRange, hotelidArray) => {
  const url = 'https://jectxbackend-672789bf3678.herokuapp.com/rezervasyonkarsilastirmaHaftalik';
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const callrezIptalAnaliz = (dateRange, hotelidArray) => {
  const url = 'https://jectxbackend-672789bf3678.herokuapp.com/iptalAnalizz';
  let data = JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const callUpdatePassword = (token, password) =>{
  const url = 'https://jectxbackend-672789bf3678.herokuapp.com/updatepassword';
  let data = JSON.stringify({
    "token": token,
    "password": password
  })
  return config(url, data)
}

export const callForgotPassword = (email) => {
  const url = 'https://jectxbackend-672789bf3678.herokuapp.com/forgetPassword'
  let data = JSON.stringify({
    "mail": email,
  })
  return config(url,data)
}