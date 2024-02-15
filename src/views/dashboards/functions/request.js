import axios from "@axios";
import * as configs from "@/views/dashboards/functions/config"
import { store } from '@/store/index'

export function request(isLocal,state,loader,conf,localStore){
    store.commit(`${loader}`,0)
    axios.request(conf).then((r)=>{
        if(isLocal){
            localStorage.setItem(`${localStore}`, JSON.stringify(r.data))
            store.state.selectedHotels != 'No Hotel' ? store.commit(`${loader}`,1) : store.commit(`${loader}`,0)
        }else{
            store.commit(`${state}`,r.data)
            store.state.selectedHotels != 'No Hotel' ? store.commit(`${loader}`,1) : store.commit(`${loader}`,0)
        }
    }).catch((d)=>{
        console.log("Error ==> ", d)
    })
}