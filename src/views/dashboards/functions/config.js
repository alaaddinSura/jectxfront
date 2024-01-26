export const config = (url, data) =>{
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
  
  let data =  JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)

}

export const gecelemeDagilimConfig = (dateRange, hotelidArray) =>{
  let url = "https://jectxbackend-672789bf3678.herokuapp.com/gecelemedagilim"

  let data =  JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const rezervMiktariConfig = (dateRange, hotelidArray) =>{
  const url ="https://jectxbackend-672789bf3678.herokuapp.com/rezmiktari";

   let data =  JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const kanallaraRezDagilimConfig = (dateRange, hotelidArray)=>{
  const url ="https://jectxbackend-672789bf3678.herokuapp.com/kanalrezdagilim";

   let data =  JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const onlineRezervMiktariConfig = (dateRange, hotelidArray)=>{
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/onlrezmiktari";
  let data =  JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const gecelemeMiktariConfig = (dateRange, hotelidArray) =>{
  const url = "https://jectxbackend-672789bf3678.herokuapp.com/gecelemiktarlari";
  let data =  JSON.stringify({
    "dateRange": dateRange,
    "hotelidArray": hotelidArray
  })
  return config(url, data)
}

export const ulkeDagilimConfig = (dateRange, hotelidArray) =>{
const url = "https://jectxbackend-672789bf3678.herokuapp.com/ulkedagilim"
let data =  JSON.stringify({
  "dateRange": dateRange,
  "hotelidArray": hotelidArray
})
return config(url, data)
}