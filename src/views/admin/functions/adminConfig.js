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

  export const getGoals = () =>{
    let url = "https://jectxbackend-672789bf3678.herokuapp.com/findGoal";
    let data = ""
    return getConfig(url, data)
  }

  export const deleteGoals = (id) =>{
    let url = "https://jectxbackend-672789bf3678.herokuapp.com/deleteGoal";
    let data = JSON.stringify({
      "_id": id
    })
    return deleteConfig(url,data)
  }

  export const addGoals = (value, date, hotelId) => {
    let url = "https://jectxbackend-672789bf3678.herokuapp.com/addGoal";
    let data = JSON.stringify([{
      type: "Aylik Hedef Gelir",
      value: value,
      date: date,
      hotelId: hotelId,
    }]);
    return config(url, data);
  };

  export const updateGoals = (id,value, date, hotelId) => {
    let url = "https://jectxbackend-672789bf3678.herokuapp.com/updateGoal";
    let data = JSON.stringify({
      _id: id,
      value: value,
      date: date,
      hotelId: hotelId,
      type: "Aylik Hedef Gelir"
    })
    return config(url,data);
  }