
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogined, setToken } from '../../../redux/userSlice';
import { FontAwesome } from '@expo/vector-icons';
import api from '../../../api';
import utils from '../../../utils';


const Separator = () => <View style={styles.separator} />;

const ModifyProfile = (userData) => {
  const [name, onChangeName] = useState(null);
  const [password, onChangePassword] = useState(null);
  const [userData, setUserData] = useState('');

  console.log(name);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const a = async () => {
    const { data } = await api.getUserData(token);
    setUserData(data);
    console.log(data);
  };

  useEffect(() => {
    a();
  }, []);

  const modifyData = async () => {
    utils.isNickname(name) && (await api.modifyUserData(token, 'name', name));
    utils.isPassword(password) && (await api.modifyUserData(token, 'password', password));
  };

  return userData.login === 'google' ? (
    <ExternalProfile userData={userData} />
  ) : userData.login === 'kakao' ? (
    <ExternalProfile userData={userData} />
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert('프로필 사진 업데이트 기능 추가 중')}
          >
            <FontAwesome name="user-circle" size={120} color="#68c2ff" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={{ width: '100%', alignItems: 'flex-start' }}>
            <Text> Name</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(value) => onChangeName(value)}
            value={name}
            placeholder="Please write down"
            keyboardType="default"
          />
          <View style={{ width: '100%', alignItems: 'flex-start' }}>
            <Text> Password</Text>
          </View>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(value) => onChangePassword(value)}
            value={password}
            placeholder="Please write down"
            keyboardType="default"
          />
        </View>

        <View>
          <TouchableOpacity style={styles.modbutton} onPress={modifyData}>
            <Text style={styles.headline}> 변경사항 저장 중 </Text>
          </TouchableOpacity>

          <Separator />
          <TouchableOpacity
            style={styles.logoutbutton}
            onPress={() => {
              dispatch(setToken(''));
              dispatch(setIsLogined());
            }}
          >
             <Text style={styles.headline}> 로그아웃 </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#68c2ff',
  },

  header: {
    width: '93%',
    height: '90%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  separator: {
    marginTop: '3%',
    marginBottom: '3%',
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }, //계정전화 변경사항저장 로그아웃 나눠주는 구분 줄

  input: {
    width: 250,
    height: 50,
    marginTop: '6%',
    marginBottom: '12%',
    marginLeft: '10%',
    marginRight: '10%',
    borderWidth: 1.8,
    borderRadius : 20,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',

  }, //텍스트 입력 칸

  button: {
    width: 120,
    height: 120,
    backgroundColor: '68c2ff',
    justifyContent: 'space-around',
    alignItems: 'center',
 
    marginBottom: '15%',
  }, //프로필 사진 업로드 버튼
  headline: {
    textAlign: 'center', 
    fontSize: 18,
    marginTop: 0,
    width: 200,
    color : 'white'
 
  },//버튼내부 글자

  modbutton:{
    alignItems: "center",
    backgroundColor:"#68c2ff",
    padding:10,
    height: 50,
    width: 200,
    borderRadius : 20,
    marginTop : 20
  },//변경사항 버튼

  logoutbutton:{
    alignItems: "center",
    backgroundColor:"#ff68c2",
    padding:10,
    height: 50,
    width: 200,
    borderRadius : 20,
  },//로그아웃 버튼

});

export default ModifyProfile;

