import axios from "@axios";
import * as configs from "@/views/dashboards/functions/config"
import { store } from '@/store/index'
import * as dates from '@/views/dashboards/functions/dates'
import _ from 'lodash'



export const callYatakDagilim = (dateRange, hotelids, isLocal) => {
    store.commit("changeYatakDagilimLoader",0)
    axios.request(configs.yatakDagilimConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("yatakDagilim", JSON.stringify(r.data))//bedScatter
            store.commit("changeYatakDagilimLoader",1)
        }
        else {
            store.commit('changeYatakDagilim', r.data)
            store.commit("changeYatakDagilimLoader",1)
        }

    }).catch(d => console.log(d))
    }

export const callGecelemeDagilim = (dateRange, hotelids, isLocal) => {
    store.commit("changeGecelemeDagilimLoader",0)
    axios.request(configs.gecelemeDagilimConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecelemeDagilim", JSON.stringify(r.data))
            store.commit("changeGecelemeDagilimLoader",1)
        }
        else {
            store.commit('changeGecelemeDagilim', r.data)
            store.commit("changeGecelemeDagilimLoader",1)
        }
    }).catch(d => console.log(d))
}

export const callRezervMiktari = (dateRange, hotelids, isLocal) => {
    store.commit("changeRezervMiktarLoader", 0)
    axios.request(configs.rezervMiktariConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("rezMiktar", JSON.stringify(r.data))//rezCount
            store.commit("changeRezervMiktarLoader",1)
        }
        else {
            store.commit('changeRezervMiktar', r.data);
            store.commit("changeRezervMiktarLoader", 1)
        }
    }).catch(d => console.log(d));
}

export const callKanalRezDagilim = (dateRange, hotelids, isLocal) => {
    store.commit("changeKanalRezDagilimLoader", 0)
    axios.request(configs.kanallaraRezDagilimConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("kanalRezDagilim", JSON.stringify(r.data))//canalRez
            store.commit("changeKanalRezDagilimLoader",1)
        }
        else {
            store.commit("changeKanalRezDagilim", r.data)
            store.commit("changeKanalRezDagilimLoader",1)
        }
    }).catch(d => console.log(d));
}

export const callOnlineRezMiktari = (dateRange, hotelids, isLocal) => {
    store.commit("changeOnlineRezMiktariLoader", 0)
    axios.request(configs.onlineRezervMiktariConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("onlineRez", JSON.stringify(r.data))//onlineRez
            store.commit("changeOnlineRezMiktariLoader",1)
        }
        else {
            store.commit("changeOnlineRezMiktari", r.data)
            store.commit("changeOnlineRezMiktariLoader",1)
        }
    }).catch(d => console.log(d));
}

export const callGecelemeMiktari = (dateRange, hotelids, isLocal) => {
    store.commit("changeDolulukLoader", 0)
    axios.request(configs.gecelemeMiktariConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("nightAmount", JSON.stringify(r.data))
            store.commit("changeDolulukLoader", 1)
        }
        else {
            store.commit("changeDoluluk", r.data)
            store.commit("changeDolulukLoader",1)
        }
    }).catch(d => console.log(d));
}

export const callAyDoluluk = (endDate, hotelids, isLocal) => {
    const dayCount = 30
    let dateRange = [...new Set(dates.getLastDatesFromDate(endDate, dayCount))]
    store.commit("changeAyDolulukLoader",0)
    axios.request(configs.ayDolulukConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecelemeDagilimSonAy", JSON.stringify(r.data))
            store.commit("changeAyDolulukLoader",1)
        }
        else {
            store.commit("changeAyDoluluk", r.data)
            store.commit("changeAyDolulukLoader",1)
        }
    }).catch(e=>{
        console.log("Call Ay Doluluk FetcData ==>", e)
    })
}

export const callHaftaDoluluk = (endDate, hotelids, isLocal) => {
    const dayCount = 7
    let dateRange = [...new Set(dates.getLastDatesFromDate(endDate, dayCount))]
    store.commit("changeHaftaDolulukLoader",0)
    axios.request(configs.haftaDolulukConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecelemeDagilimSonHafta", JSON.stringify(r.data))
            store.commit("changeHaftaDolulukLoader",1)
        }
        else {
            store.commit("changeHaftaDoluluk", r.data)
            store.commit("changeHaftaDolulukLoader",1)
        }
    })
}

export const callSonYediAyDoluluk = (endDate, hotelids, isLocal) => {
    const dayCount = 210
    let dateRange = [...new Set(dates.getLastDatesFromDate(endDate, dayCount))]
    store.commit("changeSonYediAyDolulukLoader", 0)
    axios.request(configs.sonYediAyDolulukConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecelemeDagilimSon7Ay", JSON.stringify(r.data))
            store.commit("changeSonYediAyDolulukLoader",1)
        }
        else {
            store.commit("changesonYediAyDoluluk", r.data)
            store.commit("changeSonYediAyDolulukLoader", 1)
        }
    })
}

export const callUlkeDagilim = (dateRange, hotelids, isLocal) => {
    store.commit("changeUlkeDagilimLoader",0)
    axios.request(configs.ulkeDagilimConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("countryDist", JSON.stringify(r.data))
            store.commit("changeUlkeDagilimLoader",1)
        } else {
            store.commit("changeUlkeDagilim", r.data)
            store.commit("changeUlkeDagilimLoader",1)
        }
    }).catch(d => console.log(d));
}

export const callGecmisRez = (endDate, dayCount, hotelids, isLocal) => {
    let dateRange
    store.commit("changeGecmisRezervasyonlarLoader", 0)
    if (dayCount <= 7) {
        dateRange = dates.getLastDatesFromDate(endDate, 7)
    }
    else if (dayCount > 7 && dayCount <= 49) {
        dateRange = dates.getLastDatesFromDate(endDate, 49)
    }
    else {
        dateRange = dates.getLastDatesFromDate(endDate, 365)
    }

    axios.request(configs.callGecmisRezConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecmisRezervs", JSON.stringify(r.data))
            store.commit("changeGecmisRezervasyonlarLoader",1)
        } else {
            let rData = r.data
            if (rData.length == 28) {
                console.log(rData)
                store.commit("changeGecmisRezervasyonlar", rData)
                store.commit("changeGecmisRezervasyonlarLoader",1)
            }
            else if (rData.length == 196) {
                rData.forEach(item => {
                    item['DATE'] = dates.findWeek(item.DATE)
                    store.commit("changeGecmisRezervasyonlar", rData)
                })
                store.commit("changeGecmisRezervasyonlarLoader",1)
            } else {
                rData.forEach(item => {
                    item['DATE'] = item.DATE.split("-")[0] + "-" + item.DATE.split("-")[1]
                    store.commit("changeGecmisRezervasyonlar", rData)
                })
                store.commit("changeGecmisRezervasyonlarLoader",1)
            }
            //store.commit("changeGecmisRezervasyonlar", r.data)
        }
    }).catch(d => console.log(d));
}

export const callRezAnaliz = (dateRange, hotelids, isLocal) => {
    store.commit("changeRezAnalizLoader", 0)
    axios.request(configs.rezAnalizConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("rezAnaliz", JSON.stringify(r.data))
            store.commit("changeRezAnalizLoader", 1)
        }else {
            store.commit("changeRezAnaliz", r.data)
            store.commit("changeRezAnalizLoader", 1)
        }
    })
}

export const callIptalAnaliz = (dateRange, hotelids, isLocal) => {
    store.commit("changeIptalAnalizLoader", 0)
    axios.request(configs.iptalAnalizConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("iptalAnaliz", JSON.stringify(r.data))
            store.commit("changeIptalAnalizLoader",1)
        } else {
            store.commit("changeIptalAnaliz", r.data)
            store.commit("changeIptalAnalizLoader", 1)
        }
    })
}

export const callIptalEdebilirAnaliz = (dateRange, hotelids, isLocal) => {
    let dRange = dates.find7MonthsWithOrigin(dates.findMidDate(dateRange.sort()[0], dateRange.sort()[dateRange.length - 1]))
    store.commit("changeIptalEdebilirAnalizLoader",0)
    axios.request(configs.iptalEdebilirAnalizConfig(dRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("iptalEdilebilirAnaliz", JSON.stringify(r.data));
            store.commit("changeIptalEdebilirAnalizLoader",1)
        } else {
            store.commit("changeiptalEdebilirAnaliz", r.data);
            store.commit("changeIptalEdebilirAnalizLoader",1)
        }
    })
}

export const callIptalEdebilirAnalizGunluk = (dateRange, hotelids, isLocal) => {
    store.commit("changeIptalEdilebilirAnalizGunlukLoader", 0)
    axios.request(configs.iptalEdebilirAnalizConfigGunluk(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("iptalEdilebilirAnalizGunluk", JSON.stringify(r.data));
            store.commit("changeIptalEdilebilirAnalizGunlukLoader",1)
        } else {
            store.commit("changeiptalEdebilirAnalizGunluk", r.data);
            store.commit("changeIptalEdilebilirAnalizGunlukLoader",1)
        }
    })
}

export const callGecmisRezervasyonDagilim = (endDate, dayCount, hotelids, isLocal) => {
    let dateRange
    store.commit("changeGecmisRezervasyonDagilimLoader", 0)

    if (dayCount <= 7) {
        dateRange = dates.getLastDatesFromDate(endDate, 7)
    }
    else if (dayCount > 7 && dayCount <= 49) {
        dateRange = dates.getLastDatesFromDate(endDate, 49)
    }
    else {
        dateRange = dates.getLastDatesFromDate(endDate, 365)
    }
    axios.request(configs.gecmisRezervasyonDagilimConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("gecmisRezervasyonDagilim", JSON.stringify(r.data));
            store.commit("changeGecmisRezervasyonDagilimLoader", 1)
        } else {
            let rData = r.data
            if (rData.length == 28) {
                store.commit("changeGecmisRezervasyonDagilim", rData)
                store.commit("changeGecmisRezervasyonDagilimLoader", 1)
            }
            else if (rData.length == 196) {
                rData.forEach(item => {
                    item['DATE'] = dates.findWeek(item.DATE)
                    store.commit("changeGecmisRezervasyonDagilim", rData)
                })
                store.commit("changeGecmisRezervasyonDagilimLoader", 1)
            } else {
                rData.forEach(item => {
                    item['DATE'] = item.DATE.split("-")[0] + "-" + item.DATE.split("-")[1]
                    store.commit("changeGecmisRezervasyonDagilim", rData)
                })
                store.commit("changeGecmisRezervasyonDagilimLoader",1)
            }
        }
    })
}

export const callDolulukGelecekRez = (startDate, hotelids, isLocal) => {
    let dateRange = dates.findNext12months(startDate)
    store.commit("changeGelecekDolulukLoader",0)
    axios.request(configs.dolulukGelecekRezConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            // let rData = r.data
            // rData.forEach(item => {
            //     item['DATE'] = item['DATE'].split('-')[0] + '-' + item['DATE'].split('-')[1]
            // })
            localStorage.setItem("dolulukGelecekRez", JSON.stringify(r.data))
            store.commit("changeGelecekDolulukLoader", 1)
        } else {
            // let rData = r.data
            // rData.forEach(item => {
            //     item['DATE'] = item['DATE'].split('-')[0] + '-' + item['DATE'].split('-')[1]
            // })
            store.commit("changeGelecekDoluluk", r.data)
            store.commit("changeGelecekDolulukLoader", 1)
        }
    })
}

export const callOdatipiDagilim = (dateRange, hotelids, isLocal) => {
    store.commit("changeodaTipiDagilimLoader", 0)
    axios.request(configs.odaTipiDagilimConfig(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("odaTipiDagilim", JSON.stringify(r.data))
            store.commit("changeodaTipiDagilimLoader",1)
        } else {
            store.commit("changeOdaTipiDagilim", r.data)
            store.commit("changeodaTipiDagilimLoader",1)
        }
    })
}

export const callRezervasyonGecmisGunluk = (hotelids, isLocal) => {
    let dateRange = dates.getLastDatesFromDate(dates.findtodayDate(), 7)
    dateRange.forEach(item => {
        dateRange.push(dates.subtractYearFromDate(item))
    })
    axios.request(configs.callRezervasyonGecmisGunluk(dateRange, hotelids))
        .then(r => {
            let currentDates = dateRange.sort().slice(7, 14)
            let previousDates = dateRange.sort().slice(0, 7)

            let rData = r.data
            let desiredData = {
                cats: currentDates,
                data: [
                    {
                        name: "current",
                        data: rData.filter(item => currentDates.includes(item.DATE))
                    },
                    {
                        name: "previous",
                        data: rData.filter(item => previousDates.includes(item.DATE))
                    },
                ]
            }
            localStorage.setItem('rezervasyonGecmisGunluk', JSON.stringify(desiredData))
        })
        .catch(e => console.log('callRezervasyonGecmisGunluk fonksiyonu hata verdi. hata --> ', e))
}

export const callRezervasyonGecmisAylik = (hotelids, isLocal) => {
    let dateRange = dates.generatePreviousMonths(dates.findCurrentMonth(), 7)
    dateRange.forEach(item => {
        dateRange.push(dates.subtractYearFromDate(item))
    })
    axios.request(configs.callRezervasyonGecmisAylik(dateRange, hotelids))
        .then(r => {
            let currentDates = dateRange.sort().slice(7, 14)
            let previousDates = dateRange.sort().slice(0, 7)

            let rData = r.data
            let desiredData = {
                cats: currentDates,
                data: [
                    {
                        name: "current",
                        data: rData.filter(item => currentDates.includes(item.DATE))
                    },
                    {
                        name: "previous",
                        data: rData.filter(item => previousDates.includes(item.DATE))
                    },
                ]
            }
            localStorage.setItem('rezervasyonGecmisAylik', JSON.stringify(desiredData))
        })
        .catch(e => console.log('callRezervasyonGecmisGunluk fonksiyonu hata verdi. hata --> ', e))
}

export const callChannelTable = (dateRange, hotelids, isLocal) => {
    axios.request(configs.callChannelTable(dateRange, hotelids)).then((r) => {
        if (isLocal) {
            localStorage.setItem("channelTable", JSON.stringify(r.data))
        } else {
            store.commit("changeChannelTable", r.data)
        }
    })
}

export const callRawData = (dateRange, hotelids, isLocal) => {
    store.commit("changeRawDataLoader", 0)
    console.log("Raw Data içerisine girdi")
    axios.request(configs.callRawData(dateRange, hotelids))
        .then((r) => {
            if (isLocal) {
                localStorage.setItem("rawData", JSON.stringify(r.data))
                console.log("Raw Data localStoragede")
                store.commit("changeRawDataLoader", 1)
            } else {
                store.commit("changeRawData", r.data)
                console.log("Raw Dataya store'den girdi girdi")
                store.commit("changeRawDataLoader", 1)
            }
        })
        .catch(e => console.log('error in callRawData --> ', e))
}

export const callKanalDagilimGelir = (dateRange, hotelids, isLocal) => {
    axios.request(configs.callKanalDagilimGelir(dateRange, hotelids))
        .then((r) => {
            let rData = r.data
            const groupedAndSummed = _.mapValues(
                _.groupBy(rData, obj => [obj.ANAKANAL, obj.BASARILI, obj.DATE, obj.HOTELID].join()),
                group => _.sumBy(group, 'ADR')
            );
            //let mapData = 
            if (isLocal) {
                localStorage.setItem("kanalDagilimGelir", JSON.stringify(rData))
            } else {
                store.commit("changeKanalDagilimGelir", r.data)
            }
        })
        .catch(e => console.log('error in kanalDagilimGelir --> ', e))
}

export const callGunlukTakip = (dateRange, hotelids, isLocal) => {
    axios.request(configs.callKazancTakip(dateRange, hotelids))
        .then((r) => {
            let data = r.data
            let geceleme = data.map(item => item.RESID).length
            let gelir = data.filter(item => item.BASARILI == 'success')
                .map(item => item.AVERAGENIGHTPRICE)
                .reduce((f, s) => f + s, 0)
            let kayip = data.filter(item => item.BASARILI != 'success')
                .map(item => item.AVERAGENIGHTPRICE)
                .reduce((f, s) => f + s, 0)
            let adr = gelir / geceleme
            localStorage.setItem('gunlukTakip', JSON.stringify({
                gelir, kayip, adr
            }))
        })
        .catch(e => {
            console.log('error in callGunlukTakip --> ', e)
        })
}

export const callAylikTakip = (dateRange, hotelids, isLocal) => {
    dateRange = dates.findBetweenDates(dateRange[0].split('-')[0] + '-' + dateRange[0].split('-')[1] + '-01', dateRange[0]) 
    axios.request(configs.callKazancTakip(dateRange, hotelids))
        .then((r) => {
            let data = r.data
            let geceleme = data.map(item => item.RESID).length
            let gelir = data.filter(item => item.BASARILI == 'success')
                .map(item => item.AVERAGENIGHTPRICE)
                .reduce((f, s) => f + s, 0)
            let kayip = data.filter(item => item.BASARILI != 'success')
                .map(item => item.AVERAGENIGHTPRICE)
                .reduce((f, s) => f + s, 0)
            let adr = gelir / geceleme
            localStorage.setItem('aylikTakip', JSON.stringify({
                gelir, kayip, adr
            }))
        })
        .catch(e => {
            console.log('error in callGunlukTakip --> ', e)
        })
}

export const callKazancDurumuRezMiktari = (dateRange, hotelids)=>{
    dateRange = dates.findBetweenDates(dateRange[0].split('-')[0] + '-' + dateRange[0].split('-')[1] + '-01', dateRange[0])  
    axios.request(configs.rezervMiktariConfig(dateRange,hotelids)).then((r)=>{
        localStorage.setItem("kazancDurumuRezMiktar", JSON.stringify(r.data))
    }).catch(error =>{
        console.log("Kazanç Durumu Rezervasyon Miktarı error ==> ", e)
    })
}

export const callKazancDurumu7AyGrafik = (dateRange, hotelids)=>{
    dateRange = dates.find7MonthsWithOrigin(dateRange[0])
    axios.request(configs.callKazancTakipAylik(dateRange,hotelids)).then((r)=>{
        let rData = r.data.filter(item => item.BASARILI == 'success')
        localStorage.setItem('kazancDurumu7AyGrafik', JSON.stringify(rData))
    }).catch(error =>{
        console.log("Kazanç Durumu 7'li Grafik Error ==> ", error)
    })
}

export const callKanalDagilimGelirler = (dateRange, hotelids)=>{
    dateRange = dates.find7MonthsWithOrigin(dateRange[0])
    console.log(dateRange)
    axios.request(configs.kanalDagilimGelirlerconfig(dateRange,hotelids)).then((r)=>{
        localStorage.setItem("kanalDagilimGelirler", JSON.stringify(r.data))
    }).catch(error =>{
        console.log("Kanal Dağılım Gelirler Dağılım", error)
    })
}