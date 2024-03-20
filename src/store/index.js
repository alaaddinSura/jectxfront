import * as dates from "@/views/dashboards/functions/dates"
import { createStore } from "vuex"

export const store = createStore({
  state: {
    dateCount: 1,
    dateRange: dates.findYesterdayDate() + "to" + dates.findYesterdayDate(),
    selectedHotels: [22964, 22966],
    yatakDagilim: [],
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
    kanalDagilimGelir: [],
    rezMiktarAnaliz: [],
    rezMiktarIptalAnaliz: [],
    lastMonthRezervMiktarOran: [],
    lastMonthOnlineRez: [],
    //Loaderlar
    yatakDagilimLoader: [1],
    //Misafir Dağılım - Oda Tipi Dağılım
    odaTipiDagilimLoader: [1],
    //Misafir Dağılım - Ülkelere Göre Dağılım
    ulkeDagilimLoader: [1],
    //Misafir Dağılım - Geceleme Dağılım
    gecelemeDagilimLoader: [1],
    //Doluluk Dağılım - Rez Analiz
    rezAnalizLoader: [1],
    //Doluluk Dağılım - İptal Analiz
    iptalAnalizLoader: [1],
    //Doluluk Dağılım - Geçmiş Doluluk
    gecmisRezervasyonDagilimLoader: [1],
    //Doluluk Dağılım - Gelecek Doluluk
    gelecekDolulukLoader: [1],
    //Doluluk Dağılım - İptal Edilebilir Analiz (Oranlar)
    iptalEdilebilirAnalizGunlukLoader: [1],
    //Doluluk Dağılım - İptal Edilebilir Analiz (İstatistik)
    iptalEdebilirAnalizLoader: [1],
    //Rezervasyon Analiz - Raw Tablo
    rawDataLoader: [1],
    //Rezervasyon Analiz - Kanallara Göre Rezerv Dağılımı
    kanalRezDagilimLoader: [1],
    //Rezervasyon Analiz - Geçmiş Rezervasyonlar
    gecmisRezervasyonlarLoader: [1],
    //Rezervasyon Analiz - Doluluk
    dolulukLoader: [1],
    //Rezervasyon Analiz - Hafta Doluluk
    haftaDolulukLoader: [1],
    //Rezervasyon Analiz - Ay Doluluk
    ayDolulukLoader: [1],
    //Rezervasyon Analiz - Son 7 ay Doluluk
    sonYediAyDolulukLoader: [1],
    //Rezervasyon Analiz - Genel Rezerv
    rezervMiktarLoader: [1],
    //Rezervasyon Analiz - Online Rezerv
    onlineRezMiktariLoader: [1],
    //Rezervasyon Analiz - Rezerv Tablo
    channelTableLoader: [1],
    //Rezervasyon Analiz - Rez Analiz
    rezMiktarAnalizLoader: [1],
    //Rezervasyon Analiz - İptal Analiz
    rezMiktarIptalAnalizLoader: [1],
    //Forgot Password
    isForgotMailWrongLoader: [1],
    //Update Password
    isUpdatePasswordTokenActiveLoader: [1],
    //Hatalar
    //Forgot Password Hata
    isForgotMailWrong: true,
    isUpdatePasswordTokenActive: true,
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
      state.channelTable = payload;
    },
    changeRawData(state, payload){
      state.rawData = payload;
    },
    changeKanalDagilimGelir(state, payload){
      state.kanalDagilimGelir = payload;
    },
    changeRezMiktarAnaliz(state,payload){
      state.rezMiktarAnaliz = payload;
    },
    changeRezMiktarIptalAnaliz(state,payload){
      state.rezMiktarIptalAnaliz = payload;
    },
    changeLastMonthRezervMiktarOran(state,payload){
      state.lastMonthRezervMiktarOran = payload;
    },
    changeLastMonthOnlineRez(state,payload){
      state.lastMonthOnlineRez = payload;
    },
    //Loaderlar
    //Misafir Dağılım - Yatak Dağılım
    changeYatakDagilimLoader(state, payload){
      state.yatakDagilimLoader = payload;
    },//Misafir Dağılım - Oda Tipi Dağılımı
    changeodaTipiDagilimLoader(state,payload){
      state.odaTipiDagilimLoader = payload;
    },//Misafir Dağılım - Ülke Dağılım Loader
    changeUlkeDagilimLoader(state,payload){
      state.ulkeDagilimLoader = payload;
    },//Misafir Dağılım - Geceleme Dağılım
    changeGecelemeDagilimLoader(state,payload){
      state.gecelemeDagilimLoader = payload;
    },//Doluluk Dağılım - Rez Analiz
    changeRezAnalizLoader(state,payload){
      state.rezAnalizLoader = payload;
    },//Doluluk Dağılım - İptal Analiz
    changeIptalAnalizLoader(state,payload){
      state.iptalAnalizLoader = payload;
    },//Doluluk Dağılım - Gelecek Doluluk
    changeGelecekDolulukLoader(state, payload){
      state.gelecekDolulukLoader = payload;
    },//Doluluk Dağılım İptal Edilebilir Analiz (Oranlar)
    changeIptalEdilebilirAnalizGunlukLoader(state, payload){
      state.iptalEdilebilirAnalizGunlukLoader = payload;
    },//Doluluk Dağılım - İptal Edilebilir Analiz (İstatistik)
    changeIptalEdebilirAnalizLoader(state,payload){
      state.iptalEdebilirAnalizLoader = payload
    },//Rezervasyon Analiz - Raw Tablo
    changeRawDataLoader(state, payload){
      state.rawDataLoader = payload;
    },//Rezervasyon Analiz - Geçmiş Rezervasyonlar
    changeGecmisRezervasyonlarLoader(state, payload){
      state.gecmisRezervasyonlarLoader = payload;
    },//Rezervasyon Analiz - Kanallara Göre Dağılım
    changeKanalRezDagilimLoader(state,payload){
      state.kanalRezDagilimLoader = payload;
    },//Rezervasyon Analiz - Doluluk
    changeDolulukLoader(state, payload){
      state.dolulukLoader = payload;
    },//Rezervasyon Analiz - Hafta Doluluk
    changeHaftaDolulukLoader(state,payload){
      state.haftaDolulukLoader = payload;
    },//Rezervasyon Analiz - Ay Doluluk
    changeAyDolulukLoader(state,payload){
      state.ayDolulukLoader = payload;
    },//Rezervasyon Analiz - Son Yedi Ay Doluluk
    changeSonYediAyDolulukLoader(state,payload){
      state.sonYediAyDolulukLoader = payload
    },//Rezervasyon Analiz - Genel Rezerv
    changeRezervMiktarLoader(state, payload){
      state.rezervMiktarLoader = payload;
    },//Rezervasyon Analiz - Online Rezerv
    changeOnlineRezMiktariLoader(state, payload){
      state.onlineRezMiktariLoader = payload;
    },// Geçmiş Doluluk - Geçmiş Doluluk
    changeGecmisRezervasyonDagilimLoader(state,payload){
      state.gecmisRezervasyonDagilimLoader = payload;
    },//Rezervasyon Analiz - Rezerv Tablo
    changeChannelTableLoader(state,payload){
      state.channelTableLoader = payload;
    },//Rezervasyon Analiz - Rez Analiz
    changeRezMiktarAnalizLoader(state,payload){
      state.rezMiktarAnalizLoader = payload;
    },//Rezervasyon Analiz - İptal Analiz
    changeRezMiktarIptalAnalizLoader(state,payload){
      state.rezMiktarIptalAnalizLoader = payload;
    },// Forgot Password
    changeisForgotMailWrongLoader(state,payload){
      state.isForgotMailWrongLoader = payload
    },//Update Password
    changeisUpdatePasswordTokenActiveLoader(state,payload){
      state.isUpdatePasswordTokenActiveLoader = payload;
    },
     //Hatalar
     //Forgot Password
     changeisForgotMailrong(state,payload){
       state.isForgotMailWrong = payload;
     },//Update Password Token Active
     changeisUpdatePasswordTokenActive(state,payload){
      state.isUpdatePasswordTokenActive = payload;
     }
  },
  actions: {},
})