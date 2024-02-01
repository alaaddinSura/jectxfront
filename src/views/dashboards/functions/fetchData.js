import axios from "@axios";
import * as configs from "@/views/dashboards/functions/config"
import { store } from '@/store/index'
import * as dates from '@/views/dashboards/functions/dates'


export const callYatakDagilim = (dateRange, hotelids, isLocal) =>{
    axios.request(configs.yatakDagilimConfig(dateRange, hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("yatakDagilim", JSON.stringify(r.data))//bedScatter
        }
        else{
            store.commit('changeYatakDagilim', r.data)
        }
        
      }).catch(d => console.log(d))
}

export const callGecelemeDagilim = (dateRange, hotelids, isLocal) =>{
    axios.request(configs.gecelemeDagilimConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("gecelemeDagilim", JSON.stringify(r.data))
        }
        else{
            store.commit('changeGecelemeDagilim', r.data)
        }
    }).catch(d => console.log(d))
}

export const callRezervMiktari = (dateRange, hotelids, isLocal)=>{
    axios.request(configs.rezervMiktariConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("rezMiktar", JSON.stringify(r.data))//rezCount
        }
        else{
            store.commit('changeRezervMiktar', r.data);
        }
    }).catch(d => console.log(d));
}

export const callKanalRezDagilim = (dateRange, hotelids, isLocal)=>{
    axios.request(configs.kanallaraRezDagilimConfig(dateRange, hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("kanalRezDagilim", JSON.stringify(r.data))//canalRez
        }
        else{
            store.commit("changeKanalRezDagilim", r.data)
        }
    }).catch(d=> console.log(d));
}

export const callOnlineRezMiktari = (dateRange, hotelids, isLocal) =>{
    axios.request(configs.onlineRezervMiktariConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("onlineRez", JSON.stringify(r.data))//onlineRez
        }
        else{
            store.commit("changeOnlineRezMiktari", r.data)
        }
    }).catch(d=> console.log(d));
}

export const callGecelemeMiktari = (dateRange, hotelids, isLocal) =>{
    
    axios.request(configs.gecelemeMiktariConfig(dateRange, hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("nightAmount", JSON.stringify(r.data))
        }
        else{
            store.commit("changeDoluluk", r.data)
        }
    }).catch(d=> console.log(d));
}

export const callAyDoluluk = (endDate, hotelids, isLocal) =>{
    const dayCount = 30
    let dateRange = [...new Set(dates.getLastDatesFromDate(endDate, dayCount))]

    axios.request(configs.ayDolulukConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("gecelemeDagilimSonAy", JSON.stringify(r.data))
        }
        else{
            store.commit("changeAyDoluluk", r.data)
        }
    })
}

export const callHaftaDoluluk =  (endDate, hotelids, isLocal) =>{
    const dayCount = 7
    let dateRange = [...new Set(dates.getLastDatesFromDate(endDate, dayCount))]

    axios.request(configs.haftaDolulukConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("gecelemeDagilimSonHafta", JSON.stringify(r.data))
        }
        else{
            store.commit("changeHaftaDoluluk", r.data)
        }
    })
}

export const callSonYediAyDoluluk =  (endDate, hotelids, isLocal) =>{
    const dayCount = 210
    let dateRange = [...new Set(dates.getLastDatesFromDate(endDate, dayCount))]

    axios.request(configs.sonYediAyDolulukConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("gecelemeDagilimSon7Ay", JSON.stringify(r.data))
        }
        else{
            store.commit("changesonYediAyDoluluk",r.data)
        }
    })
}

export const callUlkeDagilim = (dateRange, hotelids, isLocal)=>{
    axios.request(configs.ulkeDagilimConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("countryDist", JSON.stringify(r.data))
        }else{
            store.commit("changeUlkeDagilim",r.data)
        }
    }).catch(d=> console.log(d));
}

export const callGecmisRez = (endDate,dayCount, hotelids, isLocal) => {
    let dateRange

     if(dayCount <= 7){
         dateRange = dates.getLastDatesFromDate(endDate, 7)
     }
     else if(dayCount > 7 && dayCount <= 49){
         dateRange = dates.getLastDatesFromDate(endDate, 49)
     }
     else{
        dateRange = dates.getLastDatesFromDate(endDate, 365)
     }

     axios.request(configs.callGecmisRezConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecmisRezervs", JSON.stringify(r.data))
            
        }else{
            let rData = r.data
            if(rData.length == 28){
                store.commit("changeGecmisRezervasyonlar", rData)
            }
            else if(rData.length == 196){
                rData.forEach(item => {
                    item['DATE'] = dates.findWeek(item.DATE)
                    store.commit("changeGecmisRezervasyonlar", rData)
                })
            }else{
                rData.forEach(item =>{
                    item['DATEORJ'] = item.DATE
                    item['DATE'] = item.DATE.split("-")[0] + "-" + item.DATE.split("-")[1]
                    store.commit("changeGecmisRezervasyonlar", rData)
                })
            }
            //store.commit("changeGecmisRezervasyonlar", r.data)
        }
    }).catch(d => console.log(d));
}

export const callRezAnaliz = (dateRange, hotelids, isLocal)=>{
    axios.request(configs.rezAnalizConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("rezAnaliz", JSON.stringify(r.data))
        }else{
            store.commit("changeRezAnaliz", r.data)
        }
    })
}

export const callIptalAnaliz = (dateRange, hotelids, isLocal)=>{
    axios.request(configs.iptalAnalizConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("iptalAnaliz", JSON.stringify(r.data))
        }else{
            store.commit("changeIptalAnaliz", r.data)
        }
    })
}

export const callIptalEdebilirAnaliz = (dateRange, hotelids, isLocal)=>{
    axios.request(configs.iptalEdebilirAnalizConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("iptalEdilebilirAnaliz", JSON.stringify(r.data));
        }else{
            store.commit("changeiptalEdebilirAnaliz", r.data);
        }
    })
}

export const callGecmisRezervasyonDagilim = (endDate,dayCount, hotelids, isLocal)=>{
    
    let dateRange

     if(dayCount <= 7){
         dateRange = dates.getLastDatesFromDate(endDate, 7)
     }
     else if(dayCount > 7 && dayCount <= 49){
         dateRange = dates.getLastDatesFromDate(endDate, 49)
         console.log('kaşskdşaslkdşlaskdş')
     }
     else{
        dateRange = dates.getLastDatesFromDate(endDate, 365)
     }
    axios.request(configs.gecmisRezervasyonDagilimConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("gecmisRezervasyonDagilim", JSON.stringify(r.data));
        }else{
            let rData = r.data
            if(rData.length == 28){
                store.commit("changeGecmisRezervasyonDagilim", rData)
            }
            else if(rData.length == 196){
                rData.forEach(item => {
                    item['DATE'] = dates.findWeek(item.DATE)
                    store.commit("changeGecmisRezervasyonDagilim", rData)
                })
            }else{
                rData.forEach(item =>{
                    item['DATEORJ'] = item.DATE
                    item['DATE'] = item.DATE.split("-")[0] + "-" + item.DATE.split("-")[1]
                    store.commit("changeGecmisRezervasyonDagilim", rData)
                })
                
            }
        }
    })
}

export const callGelecekDoluluk = (endDate, hotelids, isLocal) =>{

    //console.log(configs.gelecekDolulukConfig(endDate,hotelids))

     axios.request(configs.gelecekDolulukConfig(endDate,hotelids)).then((r=>{
         if(isLocal){
             localStorage.setItem("gelecekDoluluk", JSON.stringify(r.data))
         }else{
             store.commit("changeGelecekDoluluk", r.data)
         }
     })).catch(err => console.log(err))
}

export const callOdatipiDagilim = (dateRange, hotelids, isLocal) =>{
    axios.request(configs.odaTipiDagilimConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("odaTipiDagilim", JSON.stringify(r.data))
        }else{
            store.commit("changeOdaTipiDagilim", r.data)
        }
    })
}