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
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Separator = () => <View style={styles.separator} />;

const Profile = () => {
  const [Name, onChangeName] = useState(null);
  const [Id, onChangeUserId] = useState(null);
  const [Password, onChangeUserPassword] = useState(null);
  const [Email, onChangeUserEmail] = useState(null);

  return (
    <View style={{ width: windowWidth, height: windowHeight, backgroundColor: '#68c2ff' }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('프로필 사진 업데이트 기능 추가 중')}
        >
          <FontAwesome name="user-circle" size={80} color="#68c2ff" />
        </TouchableOpacity>

        <View>
          <Text> Name</Text>
          <TextInput
            style={styles.input}
            onChangeName={onChangeName}
            value={Name}
            placeholder="Please write down the Name"
            keyboardType="default"
          />

          <Text> Id</Text>
          <TextInput
            style={styles.input}
            onChangeUserId={onChangeUserId}
            value={Id}
            placeholder="Please write down the Id"
            keyboardType="default"
          />

          <Text> Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeUserPassword={onChangeUserPassword}
            value={Password}
            placeholder="Please write down the Password"
          />

          <Text> E-mail</Text>
          <TextInput
            style={styles.input}
            onChangeUserEmailt={onChangeUserEmail}
            value={Email}
            placeholder="Please write down the email"
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

          <Button
            title="로 그  아 웃"
            color="#ff68c2"
            onPress={() => Alert.alert('로그 아웃 하는 중')}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,

    justifyContent: 'center',
    marginHorizontal: 18,

    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 35,

    backgroundColor: 'white',
    alignItems: 'center',
  },

  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }, //계정전화 변경사항저장 로그아웃 나눠주는 구분 줄

  input: {
    height: 50,
    margin: 10,
    marginBottom: 30,
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  }, //텍스트 입력 칸
  button: {
    width: 340,
    height: 80,
    backgroundColor: '68c2ff',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 40,
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
