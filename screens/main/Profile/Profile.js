import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
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
  const [Id, onChangeUserId] = useState(null);
  const [Password, onChangeUserPassword] = useState(null);
  const [Email, onChangeUserEmail] = useState(null);
  StatusBar.setBarStyle('dark-content');
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
    <ScrollView style={{ width: windowWidth, height: windowHeight, backgroundColor: '#68c2ff' }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('프로필 사진 업데이트 기능 추가 중')}
        >
          <FontAwesome name="user-circle" size={90} color="#68c2ff" />
        </TouchableOpacity>

        <View>
          <Text> Name</Text>
          <TextInput
            style={styles.input}
            onChangeName={onChangeName}
            value={Name}
            placeholder="Please write down"
            keyboardType="default"
          />

          <Text> Id</Text>
          <TextInput
            style={styles.input}
            onChangeUserId={onChangeUserId}
            value={Id}
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
          />

          <Text> E-mail</Text>
          <TextInput
            style={styles.input}
            onChangeUserEmailt={onChangeUserEmail}
            value={Email}
            placeholder="Please write down"
            keyboardType="email-address"
          />
        </View>
        <Separator />
        <View>
          <Button
            title="변 경 사 항  저 장"
            color="#68c2ff"
            onPress={() => Alert.alert('변경사항 저장 중')}
          />

          <Separator />

          <Button
            title="계 정  전 환"
            color="#68c2ff"
            onPress={() => Alert.alert('계정 전환 메뉴변경사항 저장 중')}
          />

          <Separator />

          <Button title="로 그  아 웃" color="#ff68c2" onPress={() => dispatch(setIsLogined())} />

          <Separator />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '10%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }, //계정전화 변경사항저장 로그아웃 나눠주는 구분 줄

  input: {
    height: 45,
    margin: 10,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 1.8,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  }, //텍스트 입력 칸
  button: {
    width: 90,
    height: 90,
    backgroundColor: '68c2ff',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  }, //프로필 사진 업로드 버튼

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
