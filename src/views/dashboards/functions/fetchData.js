import axios from "@axios";
import * as configs from "@/views/dashboards/functions/config"
import { store } from '@/store/index'


export const callYatakDagilim = (dateRange, hotelids, isLocal) =>{
    axios.request(configs.yatakDagilimConfig(dateRange, hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("yatakDagilim", JSON.stringify(r.data))//bedScatter
        }
        else{
            store.commit('changeYatakDagilim', JSON.stringify(r.data))
        }
        
      }).catch(d => console.log(d))
}

export const callGecelemeDagilim = (dateRange, hotelids, isLocal) =>{
    axios.request(configs.gecelemeDagilimConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("gecelemeDagilim", JSON.stringify(r.data))
            console.log(r.data)
        }
    }).catch(d => console.log(d))
}

export const callRezervMiktari = (dateRange, hotelids, isLocal)=>{
    axios.request(configs.rezervMiktariConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("rezMiktar", JSON.stringify(r.data))//rezCount
        }
    }).catch(d => console.log(d));
}

export const callKanalRezDagilim = (dateRange, hotelids, isLocal)=>{
    axios.request(configs.kanallaraRezDagilimConfig(dateRange, hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("kanalRezDagilim", JSON.stringify(r.data))//canalRez
        }
    }).catch(d=> console.log(d));
}

export const callOnlineRezMiktari = (dateRange, hotelids, isLocal) =>{
    axios.request(configs.onlineRezervMiktariConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("onlineRez", JSON.stringify(r.data))//onlineRez
        }
    }).catch(d=> console.log(d));
}

export const callGecelemeMiktari = (dateRange, hotelids, isLocal) =>{
    axios.request(configs.gecelemeMiktariConfig(dateRange, hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("nightAmount", JSON.stringify(r.data))
        }
    }).catch(d=> console.log(d));
}

export const callUlkeDagilim = (dateRange, hotelids, isLocal)=>{
    axios.request(configs.ulkeDagilimConfig(dateRange,hotelids)).then((r)=>{
        if(isLocal){
            localStorage.setItem("countryDist", JSON.stringify(r.data))
        }
    }).catch(d=> console.log(d));
}