import { Platform } from 'react-native';

export default {
  isAndroid: () => Platform.OS === 'android',
  isEmail: (email) => {
    const regExp =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regExp.test(email);
  },
  isNickname: (nickname) => {
    const regExp = /^[a-zA-Z가-힣]+([\w가-힣]){1,9}$/;
    return regExp.test(nickname);
  },
  isId: (id) => {
    const regExp = /^[a-zA-Z]+[a-zA-Z0-9]{5,19}$/;
    return regExp.test(id);
  },
  isPassword: (password) => {
    const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    return regExp.test(password);
  },
};
