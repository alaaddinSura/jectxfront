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
        }
    }).catch(d=> console.log(d));
}

export const callGecmisRez = (dateRange, hotelids, isLocal) => {
    axios.request(configs.callGecmisRezConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecmisRezervs", JSON.stringify(r.data))
        }
    }).catch(d => console.log(d));
}
