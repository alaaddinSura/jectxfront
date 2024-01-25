export const config = (url, data) =>{
    
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
}