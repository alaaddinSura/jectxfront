import * as dates from "@/views/dashboards/functions/dates"
import { createStore } from "vuex"

export const store = createStore({
  state: {
    dateCount: 1,
    dateRange: dates.findYesterdayDate() + "to" + dates.findtodayDate(),
    selectedHotels: [22964, 22966],
    yatakDagilim: [],
    yatakDagilimLoader: [],
    gecelemeDagilim: [],
    rezervMiktar: [],
    kanalRezDagilim: [],
    onlineRezMiktari: [],
    doluluk: [],
    ayDoluluk: [],
    haftaDoluluk: [],
    sonYediAyDoluluk: [],
    gecmisRezervasyonlar: [],
    rezAnaliz:[],
    iptalAnaliz: [],
    iptalEdebilirAnaliz: [],
    iptalEdilebilirAnalizGunluk: [],
    gecmisRezervasyonDagilim: [],
    ulkeDagilim: [],
    gelecekDoluluk: [],
    odaTipiDagilim: [],
    guestTypes: {},
    guestNations: [],
    rawData: [],
    channelTable: [],
    rawData: [],
    kanalDagilimGelir: []
  },
  getters: {},
  mutations: {
    changeDateRange(state, payload){
      state.dateRange = payload
    },
    changeSelectedHotels(state, payload){
      state.selectedHotels = payload
    },
    changeGuestTypes(state, payload){
      state.guestTypes = payload
    },
    changeGuestNations(state, payload){
      state.guestNations = payload
    },
    changeRawData(state, payload){
      state.rawData = payload
    },
    changeYatakDagilim(state, payload){
      state.yatakDagilim = payload
    },
    changeGecelemeDagilim(state, payload){
      state.gecelemeDagilim = payload;
    },
    changeRezervMiktar(state,payload){
      state.rezervMiktar = payload;
    },
    changeKanalRezDagilim(state,payload){
      state.kanalRezDagilim = payload;
    },
    changeOnlineRezMiktari(state, payload){
      state.onlineRezMiktari = payload;
    },
    changeDoluluk(state, payload){
      state.doluluk = payload;
    },
    changeAyDoluluk(state,payload){
      state.ayDoluluk = payload;
    },
    changeHaftaDoluluk(state,payload){
      state.haftaDoluluk = payload;
    },
    changesonYediAyDoluluk(state,payload){
      state.sonYediAyDoluluk = payload;
    },
    changeDateCount(state, payload){
      state.dateCount = payload;
    },
    changeGecmisRezervasyonlar(state, payload){
      state.gecmisRezervasyonlar = payload;
    },
    changeRezAnaliz(state,payload){
      state.rezAnaliz = payload;
    },
    changeIptalAnaliz(state,payload){
      state.iptalAnaliz = payload;
    },
    changeiptalEdebilirAnaliz(state, payload){
      state.iptalEdebilirAnaliz = payload;
    },
    changeiptalEdebilirAnalizGunluk(state, payload) {
      state.iptalEdilebilirAnalizGunluk = payload;
    },
    changeGecmisRezervasyonDagilim(state, payload){
      state.gecmisRezervasyonDagilim = payload;
    },
    changeUlkeDagilim(state, payload){
      state.ulkeDagilim = payload;
    },
    changeGelecekDoluluk(state, payload){
      state.gelecekDoluluk = payload;
    },
    changeOdaTipiDagilim(state, payload){
      state.odaTipiDagilim = payload;
    },
    changeChannelTable(state, payload){
      state.channelTable = payload
    },
    changeRawData(state, payload){
      state.rawData = payload
    },
    changeKanalDagilimGelir(state, payload){
      state.kanalDagilimGelir = payload
    },
    changeYatakDagilimLoader(state, payload){
      state.yatakDagilimLoader = payload
    }
  },
  actions: {},
})