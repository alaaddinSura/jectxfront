import axios from "@axios";
import * as configs from "@/views/dashboards/functions/config";
import { store } from "@/store/index";
import * as dates from "@/views/dashboards/functions/dates";
import * as request from "@/views/dashboards/functions/request";
import _ from "lodash";

export const callYatakDagilim = (dateRange, hotelids, isLocal) => {
  store.commit("changeYatakDagilimLoader", 0);
  axios
    .request(configs.yatakDagilimConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("yatakDagilim", JSON.stringify(r.data)); //bedScatter
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeYatakDagilimLoader", 1)
          : store.commit("changeYatakDagilimLoader", 0);
      } else {
        store.commit("changeYatakDagilim", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeYatakDagilimLoader", 1)
          : store.commit("changeYatakDagilimLoader", 0);
      }
    })
    .catch((d) => console.log(d));
};

export const callGecelemeDagilim = (dateRange, hotelids, isLocal) => {
  store.commit("changeGecelemeDagilimLoader", 0);
  axios
    .request(configs.gecelemeDagilimConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("gecelemeDagilim", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeGecelemeDagilimLoader", 1)
          : store.commit("changeGecelemeDagilimLoader", 0);
      } else {
        store.commit("changeGecelemeDagilim", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeGecelemeDagilimLoader", 1)
          : store.commit("changeGecelemeDagilimLoader", 0);
      }
    })
    .catch((d) => console.log(d));
};

export const callRezervMiktari = (dateRange, hotelids, isLocal) => {
  store.commit("changeRezervMiktarLoader", 0);
  axios
    .request(configs.rezervMiktariConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("rezMiktar", JSON.stringify(r.data)); //rezCount
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeRezervMiktarLoader", 1)
          : store.commit("changeRezervMiktarLoader", 0);
      } else {
        store.commit("changeRezervMiktar", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeRezervMiktarLoader", 1)
          : store.commit("changeRezervMiktarLoader", 0);
      }
    })
    .catch((d) => console.log(d));
};

export const rezervMikariOran = (dateRange, hotelids, isLocal) => {
  dateRange = dates.findLastMonthArray(dateRange);
  axios.request(configs.rezervMiktariConfig(dateRange, hotelids)).then((r) => {
    if (isLocal) {
      localStorage.setItem("lastMonthRezMiktar", JSON.stringify(r.data));
    } else {
      store.commit("changeLastMonthRezervMiktarOran", r.data);
    }
  });
};

export const callKanalRezDagilim = (dateRange, hotelids, isLocal) => {
  store.commit("changeKanalRezDagilimLoader", 0);
  axios
    .request(configs.kanallaraRezDagilimConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("kanalRezDagilim", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeKanalRezDagilimLoader", 1)
          : store.commit("changeKanalRezDagilimLoader", 0);
      } else {
        store.commit("changeKanalRezDagilim", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeKanalRezDagilimLoader", 1)
          : store.commit("changeKanalRezDagilimLoader", 0);
      }
    })
    .catch((d) => console.log(d));
};

export const lastMonthOnlineRezMiktari = (dateRange, hotelids, isLocal) => {
  dateRange = dates.findLastMonthArray(dateRange);
  axios
    .request(configs.onlineRezervMiktariConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("lastMonthOnlineRez", JSON.stringify(r.data));
      } else {
        store.commit("changeLastMonthOnlineRez", r.data);
      }
    });
};

export const callOnlineRezMiktari = (dateRange, hotelids, isLocal) => {
  store.commit("changeOnlineRezMiktariLoader", 0);
  axios
    .request(configs.onlineRezervMiktariConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("onlineRez", JSON.stringify(r.data)); //onlineRez
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeOnlineRezMiktariLoader", 1)
          : store.commit("changeOnlineRezMiktariLoader", 0);
      } else {
        store.commit("changeOnlineRezMiktari", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeOnlineRezMiktariLoader", 1)
          : store.commit("changeOnlineRezMiktariLoader", 0);
      }
    })
    .catch((d) => console.log(d));
};

export const callGecelemeMiktari = (dateRange, hotelids, isLocal) => {
  store.commit("changeDolulukLoader", 0);
  axios
    .request(configs.gecelemeMiktariConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("nightAmount", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeDolulukLoader", 1)
          : store.commit("changeDolulukLoader", 0);
      } else {
        store.commit("changeDoluluk", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeDolulukLoader", 1)
          : store.commit("changeDolulukLoader", 0);
      }
    })
    .catch((d) => console.log(d));
};

export const callAyDoluluk = (endDate, hotelids, isLocal) => {
  const dayCount = 30;
  endDate = dates.findNextDay(endDate);
  let dateRange = [...new Set(dates.getLastDatesFromDate(endDate, dayCount))];
  store.commit("changeAyDolulukLoader", 0);
  axios
    .request(configs.ayDolulukConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("gecelemeDagilimSonAy", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeAyDolulukLoader", 1)
          : store.commit("changeAyDolulukLoader", 0);
      } else {
        store.commit("changeAyDoluluk", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeAyDolulukLoader", 1)
          : store.commit("changeAyDolulukLoader", 0);
      }
    })
    .catch((e) => {
      console.log("Call Ay Doluluk FetcData ==>", e);
    });
};

export const callHaftaDoluluk = (endDate, hotelids, isLocal) => {
  const dayCount = 7;
  endDate = dates.findNextDay(endDate);
  let dateRange = [...new Set(dates.getLastDatesFromDate(endDate, dayCount))];
  store.commit("changeHaftaDolulukLoader", 0);
  axios
    .request(configs.haftaDolulukConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("gecelemeDagilimSonHafta", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeHaftaDolulukLoader", 1)
          : store.commit("changeHaftaDolulukLoader", 0);
      } else {
        store.commit("changeHaftaDoluluk", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeHaftaDolulukLoader", 1)
          : store.commit("changeHaftaDolulukLoader", 0);
      }
    })
    .catch((d) => {
      console.log("Hafta Doluluk error ==> ", d);
    });
};

export const callSonYediAyDoluluk = (endDate, hotelids, isLocal) => {
  const dayCount = 210;
  endDate = dates.findNextDay(endDate);
  let dateRange = [...new Set(dates.getLastDatesFromDate(endDate, dayCount))];
  store.commit("changeSonYediAyDolulukLoader", 0);
  axios
    .request(configs.sonYediAyDolulukConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("gecelemeDagilimSon7Ay", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeSonYediAyDolulukLoader", 1)
          : store.commit("changeSonYediAyDolulukLoader", 0);
      } else {
        store.commit("changesonYediAyDoluluk", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeSonYediAyDolulukLoader", 1)
          : store.commit("changeSonYediAyDolulukLoader", 0);
      }
    })
    .catch((d) => {
      "Son Yedi Ay Doluluk ==> ", d;
    });
};

export const callUlkeDagilim = (dateRange, hotelids, isLocal) => {
  store.commit("changeUlkeDagilimLoader", 0);
  axios
    .request(configs.ulkeDagilimConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("countryDist", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeUlkeDagilimLoader", 1)
          : store.commit("changeUlkeDagilimLoader", 0);
      } else {
        store.commit("changeUlkeDagilim", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeUlkeDagilimLoader", 1)
          : store.commit("changeUlkeDagilimLoader", 0);
      }
    })
    .catch((d) => console.log(d));
};

export const callGecmisRez = (endDate, dayCount, hotelids, isLocal) => {
  let dateRange;
  let date1 = new Date(endDate);
  store.commit("changeGecmisRezervasyonlarLoader", 0);
  if (dayCount <= 7) {
    endDate = dates.oneDayIncrease(endDate);
    dateRange = dates.getLastDatesFromDate(endDate, 7);
  } else if (dayCount > 7 && dayCount <= 49) {
    dateRange = dates.getLastDatesFromDate(endDate, 49);
  } else {
    dateRange = dates.getLastDatesFromDate(endDate, 365);
  }
  axios
    .request(configs.callGecmisRezConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("gecmisRezervs", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeGecmisRezervasyonlarLoader", 1)
          : store.commit("changeGecmisRezervasyonlarLoader", 0);
      } else {
        let rData = r.data;
        if (rData.length == 28) {
          store.commit("changeGecmisRezervasyonlar", rData);
          store.state.selectedHotels != "No Hotel"
            ? store.commit("changeGecmisRezervasyonlarLoader", 1)
            : store.commit("changeGecmisRezervasyonlarLoader", 0);
        } else if (rData.length == 196) {
          rData.forEach((item) => {
            item["DATE"] = dates.findWeek(item.DATE);
            store.commit("changeGecmisRezervasyonlar", rData);
          });
          store.state.selectedHotels != "No Hotel"
            ? store.commit("changeGecmisRezervasyonlarLoader", 1)
            : store.commit("changeGecmisRezervasyonlarLoader", 0);
        } else {
          rData.forEach((item) => {
            item["DATE"] =
              item.DATE.split("-")[0] + "-" + item.DATE.split("-")[1];
            store.commit("changeGecmisRezervasyonlar", rData);
          });
          store.state.selectedHotels != "No Hotel"
            ? store.commit("changeGecmisRezervasyonlarLoader", 1)
            : store.commit("changeGecmisRezervasyonlarLoader", 0);
        }
        //store.commit("changeGecmisRezervasyonlar", r.data)
      }
    })
    .catch((d) => console.log(d));
};

export const callRezAnaliz = (dateRange, hotelids, isLocal) => {
  store.commit("changeRezAnalizLoader", 0);
  axios
    .request(configs.rezAnalizConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("rezAnaliz", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeRezAnalizLoader", 1)
          : store.commit("changeRezAnalizLoader", 0);
      } else {
        store.commit("changeRezAnaliz", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeRezAnalizLoader", 1)
          : store.commit("changeRezAnalizLoader", 0);
      }
    })
    .catch((d) => {
      console.log("Rez Analiz ==> ", d);
    });
};

export const callIptalAnaliz = (dateRange, hotelids, isLocal) => {
  store.commit("changeIptalAnalizLoader", 0);
  axios
    .request(configs.iptalAnalizConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("iptalAnaliz", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeIptalAnalizLoader", 1)
          : store.commit("changeIptalAnalizLoader", 0);
      } else {
        store.commit("changeIptalAnaliz", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeIptalAnalizLoader", 1)
          : store.commit("changeIptalAnalizLoader", 0);
      }
    })
    .catch((d) => {
      console.log("İptal Analiz ==> ", d);
    });
};

export const callIptalEdebilirAnaliz = (dateRange, hotelids, isLocal) => {
  let dRange = dates.find7MonthsWithOrigin(
    dates.findMidDate(
      dateRange.sort()[0],
      dateRange.sort()[dateRange.length - 1]
    )
  );
  store.commit("changeIptalEdebilirAnalizLoader", 0);
  axios
    .request(configs.iptalEdebilirAnalizConfig(dRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("iptalEdilebilirAnaliz", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeIptalEdebilirAnalizLoader", 1)
          : store.commit("changeIptalEdebilirAnalizLoader", 0);
      } else {
        store.commit("changeiptalEdebilirAnaliz", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeIptalEdebilirAnalizLoader", 1)
          : store.commit("changeIptalEdebilirAnalizLoader", 0);
      }
    })
    .catch((d) => {
      console.log("İptal Edilebilir Analiz ==> ", d);
    });
};

export const callIptalEdebilirAnalizGunluk = (dateRange, hotelids, isLocal) => {
  store.commit("changeIptalEdilebilirAnalizGunlukLoader", 0);
  axios
    .request(configs.iptalEdebilirAnalizConfigGunluk(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem(
          "iptalEdilebilirAnalizGunluk",
          JSON.stringify(r.data)
        );
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeIptalEdilebilirAnalizGunlukLoader", 1)
          : store.commit("changeIptalEdilebilirAnalizGunlukLoader", 0);
      } else {
        store.commit("changeiptalEdebilirAnalizGunluk", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeIptalEdilebilirAnalizGunlukLoader", 1)
          : store.commit("changeIptalEdilebilirAnalizGunlukLoader", 0);
      }
    })
    .catch((d) => {
      console.log("İptal Edilebilir Analiz Günlük ==> ", d);
    });
};

export const callGecmisRezervasyonDagilim = (
  endDate,
  dayCount,
  hotelids,
  isLocal
) => {
  let dateRange;
  store.commit("changeGecmisRezervasyonDagilimLoader", 0);

  if (dayCount <= 7) {
    dateRange = dates.getLastDatesFromDate(endDate, 7);
  } else if (dayCount > 7 && dayCount <= 49) {
    dateRange = dates.getLastDatesFromDate(endDate, 49);
  } else {
    dateRange = dates.getLastDatesFromDate(endDate, 365);
  }
  axios
    .request(configs.gecmisRezervasyonDagilimConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem(
          "gecmisRezervasyonDagilim",
          JSON.stringify(r.data)
        );
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeGecmisRezervasyonDagilimLoader", 1)
          : store.commit("changeGecmisRezervasyonDagilimLoader", 0);
      } else {
        let rData = r.data;
        if (rData.length == 28) {
          store.commit("changeGecmisRezervasyonDagilim", rData);
          store.state.selectedHotels != "No Hotel"
            ? store.commit("changeGecmisRezervasyonDagilimLoader", 1)
            : store.commit("changeGecmisRezervasyonDagilimLoader", 0);
        } else if (rData.length == 196) {
          rData.forEach((item) => {
            item["DATE"] = dates.findWeek(item.DATE);
            store.commit("changeGecmisRezervasyonDagilim", rData);
          });
          store.state.selectedHotels != "No Hotel"
            ? store.commit("changeGecmisRezervasyonDagilimLoader", 1)
            : store.commit("changeGecmisRezervasyonDagilimLoader", 0);
        } else {
          rData.forEach((item) => {
            item["DATE"] =
              item.DATE.split("-")[0] + "-" + item.DATE.split("-")[1];
            store.commit("changeGecmisRezervasyonDagilim", rData);
          });
          store.state.selectedHotels != "No Hotel"
            ? store.commit("changeGecmisRezervasyonDagilimLoader", 1)
            : store.commit("changeGecmisRezervasyonDagilimLoader", 0);
        }
      }
    })
    .catch((d) => {
      console.log("Geçmiş Rezervasyon Dağılım ==> ", d);
    });
};

export const callDolulukGelecekRez = (startDate, hotelids, isLocal) => {
  let dateRange = dates.findNext12months(startDate);
  store.commit("changeGelecekDolulukLoader", 0);
  axios
    .request(configs.dolulukGelecekRezConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        // let rData = r.data
        // rData.forEach(item => {
        //     item['DATE'] = item['DATE'].split('-')[0] + '-' + item['DATE'].split('-')[1]
        // })
        localStorage.setItem("dolulukGelecekRez", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeGelecekDolulukLoader", 1)
          : store.commit("changeGelecekDolulukLoader", 0);
      } else {
        // let rData = r.data
        // rData.forEach(item => {
        //     item['DATE'] = item['DATE'].split('-')[0] + '-' + item['DATE'].split('-')[1]
        // })
        store.commit("changeGelecekDoluluk", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeGelecekDolulukLoader", 1)
          : store.commit("changeGelecekDolulukLoader", 0);
      }
    })
    .catch((d) => {
      console.log("Gelecek Doluluk Rezervasyon ==> ", d);
    });
};

export const callOdatipiDagilim = (dateRange, hotelids, isLocal) => {
  store.commit("changeodaTipiDagilimLoader", 0);
  axios
    .request(configs.odaTipiDagilimConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("odaTipiDagilim", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeodaTipiDagilimLoader", 1)
          : store.commit("changeodaTipiDagilimLoader", 0);
      } else {
        store.commit("changeOdaTipiDagilim", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeodaTipiDagilimLoader", 1)
          : store.commit("changeodaTipiDagilimLoader", 0);
      }
    })
    .catch((d) => {
      console.log("Oda Tipi Dağılım", d);
    });
};

export const rezervasyonGecmisHaftalik = (hotelids, isLocal) => {
  let dateRange = dates.findWeek(dates.findYesterdayDate());
  dateRange = dates.findPreviousWeeks(dateRange);
  const pastYearRange = dateRange.map((item) =>
    dates.subtractYearFromDate(item)
  );
  dateRange = dateRange.concat(pastYearRange);
  axios
    .request(configs.callHaftalikGecmisKarsilastirma(dateRange, hotelids))
    .then((r) => {
      let currentDates = dateRange.sort().slice(12, 24);
      let previousDates = dateRange.sort().slice(0, 12);

      let rData = r.data;
      let desiredData = {
        cats: currentDates,
        data: [
          {
            name: "current",
            data: rData.filter((item) => currentDates.includes(item.WEEK)),
          },
          {
            name: "previous",
            data: rData.filter((item) => previousDates.includes(item.WEEK)),
          },
        ],
      };
      localStorage.setItem(
        "rezervasyonGecmisHaftalik",
        JSON.stringify(desiredData)
      );
    })
    .catch((e) =>
      console.log(
        "callRezervasyonGecmisHaftalik fonksiyonu hata verdi. hata --> ",
        e
      )
    );
};

export const callRezervasyonGecmisGunluk = (hotelids, isLocal) => {
  let dateRange = dates.getLastDatesFromDate(dates.findtodayDate(), 7);
  dateRange.forEach((item) => {
    dateRange.push(dates.subtractYearFromDate(item));
  });
  axios
    .request(configs.callRezervasyonGecmisGunluk(dateRange, hotelids))
    .then((r) => {
      let rData = r.data;
      let currentDates = dateRange.sort().slice(7, 14);
      let previousDates = dateRange.sort().slice(0, 7);
      let rDataDates = [...new Set(rData.map((item) => item.DATE))];
      dateRange.forEach((item) => {
        if (!rDataDates.includes(item)) {
          rData.push(
            {
              DATE: item,
              hotelId: 22966,
              REVPERREZ: 0,
              count: 0,
            },
            {
              DATE: item,
              hotelId: 22964,
              REVPERREZ: 0,
              count: 0,
            }
          );
        }
      });
      let desiredData = {
        cats: currentDates,
        data: [
          {
            name: "current",
            data: rData.filter((item) => currentDates.includes(item.DATE)),
          },
          {
            name: "previous",
            data: rData.filter((item) => previousDates.includes(item.DATE)),
          },
        ],
      };
      localStorage.setItem(
        "rezervasyonGecmisGunluk",
        JSON.stringify(desiredData)
      );
    })
    .catch((e) =>
      console.log(
        "callRezervasyonGecmisGunluk fonksiyonu hata verdi. hata --> ",
        e
      )
    );
};

export const callRezervasyonGecmisAylik = (hotelids, isLocal) => {
  let dateRange = dates.generatePreviousMonths(dates.findCurrentMonth(), 12);
  const pastYearRange = dateRange.map((item) =>
    dates.subtractYearFromDate(item)
  );
  dateRange = dateRange.concat(pastYearRange);
  axios
    .request(configs.callRezervasyonGecmisAylik(dateRange, hotelids))
    .then((r) => {
      let currentDates = dateRange.sort().slice(12, 24);
      let previousDates = dateRange.sort().slice(0, 12);

      let rData = r.data;
      let desiredData = {
        cats: currentDates,
        data: [
          {
            name: "current",
            data: rData.filter((item) => currentDates.includes(item.DATE)),
          },
          {
            name: "previous",
            data: rData.filter((item) => previousDates.includes(item.DATE)),
          },
        ],
      };
      localStorage.setItem(
        "rezervasyonGecmisAylik",
        JSON.stringify(desiredData)
      );
    })
    .catch((e) =>
      console.log(
        "callRezervasyonGecmisAylik fonksiyonu hata verdi. hata --> ",
        e
      )
    );
};

export const callChannelTable = (dateRange, hotelids, isLocal) => {
  store.commit("changeChannelTableLoader", 0);
  axios
    .request(configs.callChannelTable(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("channelTable", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeChannelTableLoader", 1)
          : store.commit("changeChannelTableLoader", 0);
      } else {
        store.commit("changeChannelTable", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeChannelTableLoader", 1)
          : store.commit("changeChannelTableLoader", 0);
      }
    })
    .catch((d) => {
      console.log("Channel Table ==>", d);
    });
};

export const callRawData = (dateRange, hotelids, isLocal) => {
  store.commit("changeRawDataLoader", 0);
  axios
    .request(configs.callRawData(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("rawData", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeRawDataLoader", 1)
          : store.commit("changeRawDataLoader", 0);
      } else {
        store.commit("changeRawData", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeRawDataLoader", 1)
          : store.commit("changeRawDataLoader", 0);
      }
    })
    .catch((e) => console.log("error in callRawData --> ", e));
};

export const callKanalDagilimGelir = (dateRange, hotelids, isLocal) => {
  axios
    .request(configs.callKanalDagilimGelir(dateRange, hotelids))
    .then((r) => {
      let rData = r.data;
      const groupedAndSummed = _.mapValues(
        _.groupBy(rData, (obj) =>
          [obj.ANAKANAL, obj.BASARILI, obj.DATE, obj.HOTELID].join()
        ),
        (group) => _.sumBy(group, "ADR")
      );
      //let mapData =
      if (isLocal) {
        localStorage.setItem("kanalDagilimGelir", JSON.stringify(rData));
      } else {
        store.commit("changeKanalDagilimGelir", r.data);
      }
    })
    .catch((e) => console.log("error in kanalDagilimGelir --> ", e));
};

export const callGunlukTakip = (dateRange, hotelids, isLocal) => {
  axios
    .request(configs.callKazancTakip(dateRange, hotelids))
    .then((r) => {
      let hotelIds = [22966, 22964];
      let resultData = [];
      hotelIds.forEach((hotelId) => {
        let data = r.data.filter((item) => item.HOTELID == hotelId);
        let geceleme = data
          .filter((item) => item.BASARILI == "success")
          .map((item) => item.NIGHT)
          .reduce((f, s) => f + s, 0);
        let gelir = data
          .filter((item) => item.BASARILI == "success")
          .map((item) => item.AVERAGENIGHTPRICE)
          .reduce((f, s) => f + s, 0);
        let kayip = data
          .filter((item) => item.BASARILI != "success" && item.NIGHT != 0)
          .map((item) => item.AVERAGENIGHTPRICE)
          .reduce((f, s) => f + s, 0);
        let adr = gelir / geceleme;
        resultData.push({
          gelir,
          kayip,
          adr,
          hotelId,
          geceleme,
        });
      });

      localStorage.setItem("gunlukTakip", JSON.stringify(resultData));
    })
    .catch((e) => {
      console.log("error in callGunlukTakip --> ", e);
    });
};

export const callAylikTakip = (dateRange, hotelids, isLocal) => {
  dateRange = dates.findBetweenDates(
    dateRange[0].split("-")[0] + "-" + dateRange[0].split("-")[1] + "-01",
    dateRange[0]
  );
  axios
    .request(configs.callKazancTakip(dateRange, hotelids))
    .then((r) => {
      let hotelIds = [22966, 22964];
      let resultData = [];
      hotelIds.forEach((hotelId) => {
        let data = r.data.filter((item) => item.HOTELID == hotelId);
        let geceleme = data.map((item) => item.RESID).length;
        let gelir = data
          .filter((item) => item.BASARILI == "success")
          .map((item) => item.AVERAGENIGHTPRICE)
          .reduce((f, s) => f + s, 0);
        let kayip = data
          .filter((item) => item.BASARILI != "success" && item.NIGHT != 0)
          .map((item) => item.AVERAGENIGHTPRICE)
          .reduce((f, s) => f + s, 0);
        let adr = gelir / geceleme;
        resultData.push({
          gelir,
          kayip,
          adr,
          hotelId,
        });
      });
      localStorage.setItem("aylikTakip", JSON.stringify(resultData));
    })
    .catch((e) => {
      console.log("error in callGunlukTakip --> ", e);
    });
};

export const callKazancDurumuRezMiktari = (dateRange, hotelids) => {
  dateRange = dates.findBetweenDates(
    dateRange[0].split("-")[0] + "-" + dateRange[0].split("-")[1] + "-01",
    dateRange[0]
  );
  axios
    .request(configs.rezervMiktariConfig(dateRange, hotelids))
    .then((r) => {
      localStorage.setItem("kazancDurumuRezMiktar", JSON.stringify(r.data));
    })
    .catch((error) => {
      console.log("Kazanç Durumu Rezervasyon Miktarı error ==> ", error);
    });
};
//dates.findLastMonth()
export const callKazancDurumuOran = (dateRange, hotelids) => {
  let getMonths = dates.findLastMonth(
    dateRange[0].split("-")[0] + "-" + dateRange[0].split("-")[1]
  );
  dateRange = dates.getAllDaysOfMonth(getMonths);
  axios
    .request(configs.rezervMiktariConfig(dateRange, hotelids))
    .then((r) => {
      localStorage.setItem("kazancDurumuOran", JSON.stringify(r.data));
    })
    .catch((error) => {
      console.log("Kazanç Durumu Rezervasyon Oranı error ==> ", error);
    });
};

export const callKazancDurumu7AyGrafik = (dateRange, hotelids) => {
  dateRange = dates.find7MonthsWithOrigin(dateRange[0]);
  axios
    .request(configs.callKazancTakipAylik(dateRange, hotelids))
    .then((r) => {
      let rData = r.data.filter((item) => item.BASARILI == "success");
      localStorage.setItem("kazancDurumu7AyGrafik", JSON.stringify(rData));
    })
    .catch((error) => {
      console.log("Kazanç Durumu 7'li Grafik Error ==> ", error);
    });
};

export const callKanalDagilimGelirler = (dateRange, hotelids) => {
  dateRange = dates.find7MonthsWithOrigin(dateRange[0]);
  axios
    .request(configs.kanalDagilimGelirlerconfig(dateRange, hotelids))
    .then((r) => {
      localStorage.setItem("kanalDagilimGelirler", JSON.stringify(r.data));
    })
    .catch((error) => {
      console.log("Kanal Dağılım Gelirler Dağılım", error);
    });
};

export const rezMiktarAnaliz = (dateRange, hotelids, isLocal) => {
  store.commit("changeRezMiktarAnalizLoader", 0);
  axios
    .request(configs.rezervMiktariConfig(dateRange, hotelids))
    .then((r) => {
      if (isLocal) {
        localStorage.setItem("rezMiktarAnaliz", JSON.stringify(r.data));
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeRezMiktarAnalizLoader", 1)
          : store.commit("changeRezMiktarAnalizLoader", 0);
      } else {
        store.commit("changeRezMiktarAnaliz", r.data);
        store.state.selectedHotels != "No Hotel"
          ? store.commit("changeRezMiktarAnalizLoader", 1)
          : store.commit("changeRezMiktarAnalizLoader", 0);
      }
    })
    .catch((error) => {
      console.log("Rezervasyon Miktar Analiz", error);
    });
};

export const rezMiktarIptalAnaliz = (dateRange, hotelids, isLocal) => {
  store.commit("changeRezMiktarIptalAnalizLoader", 0);
  axios.request(configs.callrezIptalAnaliz(dateRange, hotelids)).then((r) => {
    if (isLocal) {
      localStorage.setItem("rezMiktarIptalAnaliz", JSON.stringify(r.data));
      store.state.selectedHotels != "No Hotel"
        ? store.commit("changeRezMiktarIptalAnalizLoader", 1)
        : store.commit("changeRezMiktarIptalAnalizLoader", 0);
    } else {
      store.commit("changeRezMiktarIptalAnaliz", r.data);
      store.state.selectedHotels != "No Hotel"
        ? store.commit("changeRezMiktarIptalAnalizLoader", 1)
        : store.commit("changeRezMiktarIptalAnalizLoader", 0);
    }
  });
};

export const updatePassword = (token, password) => {
  store.commit("changeisUpdatePasswordTokenActiveLoader", 0);
  axios
    .request(configs.callUpdatePassword(token, password))
    .then((r) => {
      let rData = r.data;
      let message =
        rData.message === "Password updated successfully" ? false : true;
      store.commit("changeisUpdatePasswordTokenActive", message);
      store.commit("changeisUpdatePasswordTokenActiveLoader", 1);
    })
    .catch((error) => {
      let message = error.message === "Mail sent successfully" ? false : true;
      store.commit("changeisUpdatePasswordTokenActive", message);
      store.commit("changeisUpdatePasswordTokenActiveLoader", 1);
    });
};

export const forgotPassword = (email) => {
  store.commit("changeisForgotMailWrongLoader", 0);
  axios
    .request(configs.callForgotPassword(email))
    .then((r) => {
      let rData = r.data;
      let message = rData.message === "Mail sent successfully" ? false : true;
      store.commit("changeisForgotMailrong", message);
      store.commit("changeisForgotMailWrongLoader", 1);
    })
    .catch((error) => {
      let message = error.message === "Mail sent successfully" ? false : true;
      store.commit("changeisForgotMailrong", message);
      store.commit("changeisForgotMailWrongLoader", 1);
    });
};

export const userRole = () => {
  axios
    .request(configs.callUserRole())
    .then((r) => {
      //console.log("Response data:", r.data); // Log the response data
      localStorage.setItem("userRole", JSON.stringify(r.data));
      store.commit("changeUserRole", r.data);
      // console.log(
      //   "Hemen Local Storage Verisi ==> ",
      //   JSON.parse(localStorage.getItem("userRole"))
      // );
    })
    .catch((error) => {
      console.log(error);
    });
};
