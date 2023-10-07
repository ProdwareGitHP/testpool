console.log(process.env);

export const IP = process.env.REACT_APP_IP || window.location.hostname;
// export const TIMEOUT = process.env.REACT_APP_TIMEOUT || 6000;

export const TIMEOUT = 20000;
