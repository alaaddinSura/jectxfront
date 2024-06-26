const baseUrl = "http://kpi.anteholding.com:3000"

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
};

export const getConfig = (url, data) => {
  let getConfigs = {
    method: "get",
    maxBodyLength: Infinity,
    url: url,
    headers: {},
    data: data,
  };
  return getConfigs;
};

export const deleteConfig = (url, data) => {
  let delConfig = {
    method: "delete",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return delConfig
};

export const callAddUser = (email, pages, role) =>{
  let url = `${baseUrl}/addUser`;
    let data = JSON.stringify({
      emails: [
        {
          email: email,
          pages: pages,
          role: role,
        }
      ]
    })
    return config(url,data)
}

export const callUserRole = () => {
  let url = `${baseUrl}/findUser`;
  let data = '';
  return getConfig(url, data);
};

export const yatakDagilimConfig = (dateRange, hotelidArray) => {
  let url = `${baseUrl}/yatakdagilim`;

  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const callDeleteUser = (email) =>{
  let url = `${baseUrl}/deleteUserByEmail`
  let data = JSON.stringify({
    "email": email
  })
  return deleteConfig(url,data)
}
export const gecelemeDagilimConfig = (dateRange, hotelidArray) => {
  let url = `${baseUrl}/gecelemedagilim`;

  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const rezervMiktariConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/rezmiktari`;

  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const kanallaraRezDagilimConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/kanalrezdagilim`;

  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const onlineRezervMiktariConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/onlrezmiktari`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const gecelemeMiktariConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/gecelemiktarlari`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const ayDolulukConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/gecelemiktarlari`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const haftaDolulukConfig = (dateRange, hotelidArray) => {
  const url =`${baseUrl}/gecelemiktarlari`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const sonYediAyDolulukConfig = (dateRange, hotelidArray) => {
  const url =`${baseUrl}/gecelemiktarlari`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const ulkeDagilimConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/ulkedagilim`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const callGecmisRezConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/gecmisRezervasyonlar`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const rezAnalizConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/rezAnaliz`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const iptalAnalizConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/iptalAnaliz`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const iptalEdebilirAnalizConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/iptalEdilebilirAnalizAylik`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const iptalEdebilirAnalizConfigGunluk = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/iptalEdilebilirAnaliz`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const gecmisRezervasyonDagilimConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/doluluk`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const odaTipiDagilimConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/odatipidagilim`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const dolulukGelecekRezConfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/dolulukaylik`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const callRezervasyonGecmisGunluk = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/rezervasyonkarsilastirma`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const callRezervasyonGecmisAylik = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/rezervasyonkarsilastirmaAylik`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const callChannelTable = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/kanallaragoretablo`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const callRawData = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/rawdatatablo`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const callKanalDagilimGelir = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/kanaldagilimgelir`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const callKazancTakip = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/kazanctakip`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const callKazancTakipAylik = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/kazanctakipAylik`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const kanalDagilimGelirlerconfig = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/kanaldagilimgelir`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const callHaftalikGecmisKarsilastirma = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/rezervasyonkarsilastirmaHaftalik`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const callrezIptalAnaliz = (dateRange, hotelidArray) => {
  const url = `${baseUrl}/iptalAnalizz`;
  let data = JSON.stringify({
    dateRange: dateRange,
    hotelidArray: hotelidArray,
  });
  return config(url, data);
};

export const callUpdatePassword = (token, password) => {
  const url = `${baseUrl}/updatepasswordV2`;
  let data = JSON.stringify({
    token: token,
    password: password,
  });
  return config(url, data);
};

export const callForgotPassword = (email) => {
  const url = `${baseUrl}/forgetPasswordV2`;
  let data = JSON.stringify({
    mail: email,
  });
  return config(url, data);
};


export const sendMail = (email) =>{
  const url = `${baseUrl}/sendMail`;
  let data = JSON.stringify({
    mails: [email]
  });
  console.log("data ==> ", data)
  return config(url,data)
}

export const callUpdateUser = (email, newRole, newPage) =>{
  const url = `${baseUrl}/updateUser`
  let data = JSON.stringify({
    email: email,
    newRole: newRole,
    newPages: newPage
  })
  return config(url,data)
}

export const callLoginTwo = (email, password) => {
  const url = `${baseUrl}/loginV2`
  let data = JSON.stringify({
    email: email,
    password: password
  })
  return config(url, data)
}


export const calladdUserTwo = (from) => {
  const url = `${baseUrl}/addUserV2`;
  /*
  console.log('calladdUserTwo function gönderdiği data --> ' ,[
    {
      email: email,
      role: newRole,
      pages:from
    }
  ])
  */
  let data = JSON.stringify({
  emails: from
  });
  return config(url,data)
}

export const callUserRoleTwo = () => {
  let url = `${baseUrl}/findUserV2`;
  let data = '';
  return getConfig(url, data);
};

export const callUpdateUserTwo = (totalData) =>{
  const url = `${baseUrl}/updateUserV2`;
  let data = JSON.stringify(
    totalData
  )
  return config(url,data)
}

export const callDeleteUserTwo = (email) =>{
  let url = `${baseUrl}/deleteUserByEmailV2`;
  let data = JSON.stringify({
    "email": email
  })
  return deleteConfig(url,data)
}