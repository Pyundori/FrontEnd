import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogined } from '../../../redux/userSlice';
import { FontAwesome } from '@expo/vector-icons';
import api from '../../../api';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Separator = () => <View style={styles.separator} />;

const Profile = () => {
  const [Name, onChangeName] = useState(null);
  const [Password, onChangeUserPassword] = useState(null);

  StatusBar.setBarStyle('white-content');
  const dispatch = useDispatch();
  Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
  StatusBar.setTranslucent(true);

  const token = useSelector((state) => state.users.token);
  console.log(token);

  const a = async () => {
    const { data } = await api.getUserData(token);
    console.log(data);
  };
  a();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert('프로필 사진 업데이트 기능 추가 중')}
          >
            <FontAwesome name="user-circle" size={100} color="#68c2ff" />
          </TouchableOpacity>
        </View>

        <View>
          <Text> Name</Text>

          <TextInput
            style={styles.input}
            onChangeName={onChangeName}
            value={Name}
            placeholder="Please write down"
            keyboardType="default"
          />
          <Text> Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeUserPassword={onChangeUserPassword}
            value={Password}
            placeholder="Please write down"
            keyboardType="default"
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles.modbutton}
            onPress={() => Alert.alert('변경사항 저장 중')}
          >
            <Text style={styles.headline}> 변 경 사 항 저 장 중 </Text>
          </TouchableOpacity>

          <Separator />
          <TouchableOpacity style={styles.logoutbutton} onPress={() => dispatch(setIsLogined())}>
            <Text style={styles.headline}> 로 그 아 웃 </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#68c2ff',
  },

  header: {
    height: '83%',
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: '15%',
    marginLeft: '8%',
    marginRight: '8%',
    marginBottom: '10%',
    backgroundColor: 'white',
    alignItems: 'center',
  },

  separator: {
    marginTop: '6%',
    marginBottom: '6%',
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
    borderRadius: 20,
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
    color: 'white',
  }, //버튼내부 글자

  modbutton: {
    alignItems: 'center',
    backgroundColor: '#68c2ff',
    padding: 10,
    height: 50,
    width: 200,
    borderRadius: 20,
    marginTop: 20,
  }, //변경사항 버튼

  logoutbutton: {
    alignItems: 'center',
    backgroundColor: '#ff68c2',
    padding: 10,
    height: 50,
    width: 200,
    borderRadius: 20,
  }, //로그아웃 버튼

  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Profile;
