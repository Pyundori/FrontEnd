import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import api from '../../api';
import MainModal from '../../components/MainModal';
import utils from '../../utils';

const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #68c2ff;
  align-items: center;
  justify-content: center;
  padding-top: 5%;
`;

const BodyContainer = styled.View`
  height: 90%;
  width: 90%;
  align-items: flex-start;
  background-color: #f8f8f8;
  opacity: 0.9
  border-radius: 25px;
`;

const TitleContainer = styled.View`
  width: 93%
  padding-left: 5%
  margin-top: 5%;
  padding-bottom: 5%
  border-bottom-width: 2px
  border-bottom-color: #cde6f7
`;
const TitleText = styled.Text`
  font-size: 35px;
  color: #68c2ff;
`;

const ParamsContainer = styled.View`
  width: 100%
  height: 70%
  align-items: center
  justify-content: flex-start
`;

const NicknameContainer = styled.View`
  width: 85%;
  height: 20%;
  margin-top: 5%;
`;

const NicknameText = styled.Text`
  font-size: 16px;
  color: #333333;
`;

const NicknameInput = styled.TextInput`
  width: 100%;
  margin-top: 3%;
  border: 1px solid ${(props) => (props.isValidNickname ? '#333333' : 'red')};
  border-radius: 5px;
  padding: 2%
  padding-left: 10px;
  font-size: 16px;
`;

const NicknameInvalidText = styled.Text`
  font-size: 14px;
`;

const IdContainer = styled.View`
  width: 85%;
  height: 20%;
  margin-top: 5%;
`;

const IdText = styled.Text`
  font-size: 16px;
  color: #333333;
`;

const IdInput = styled.TextInput`
  width: 100%;
  margin-top: 3%;
  border: 1px solid ${(props) => (props.isValidId ? '#333333' : 'red')};
  border-radius: 5px;
  padding: 2%
  padding-left: 10px;
  font-size: 16px;
`;

const IdInvalidText = styled.Text`
  font-size: 14px;
`;

const PwContainer = styled.View`
  width: 85%;
  height: 20%;
  margin-top: 5%;
`;

const PwText = styled.Text`
  font-size: 16px;
  color: #333333;
`;

const PwInput = styled.TextInput`
  width: 100%;
  margin-top: 3%;
  border: 1px solid ${(props) => (props.isValidPw ? '#333333' : 'red')};
  border-radius: 5px;
  padding: 2%
  padding-left: 10px;
  font-size: 16px;
`;

const PwInvalidText = styled.Text`
  font-size: 14px;
`;

const PwCheckContainer = styled.View`
  width: 85%;
  height: 20%;
  margin-top: 5%;
`;

const PwCheckText = styled.Text`
  font-size: 16px;
  color: #333333;
`;

const PwCheckInput = styled.TextInput`
  width: 100%;
  margin-top: 3%;
  border: 1px solid ${(props) => (props.isValidPwCheck ? '#333333' : 'red')};
  border-radius: 5px;
  padding: 2%
  padding-left: 10px;
  font-size: 16px;
`;

const PwCheckInvalidText = styled.Text`
  font-size: 14px;
`;

const SignUpContainer = styled.View`
  width: 100%;
  height: 25%;
  align-items: center;
  justify-content: center;
  padding-bottom: 15%;
`;

const SignUpBtn = styled.Pressable`
  width: 60%;
  background-color: #5ebeff;
  padding: 3%;
  border-radius: 15px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const SignUpBtnText = styled.Text`
  font-size: 20px;
  color: #ffffff;
  text-align: center;
`;

const SignUp = () => {
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(true);
  const [isValidId, setIsValidId] = useState(true);
  const [isValidPw, setIsValidPw] = useState(true);
  const [isValidPwCheck, setIsValidPwCheck] = useState(true);
  const [isFilled, setIsFilled] = useState(false);
  const [nicknameErrorMsg, setNicknameErrorMsg] = useState('');
  const [idErrorMsg, setIdErrorMsg] = useState('');
  const [pwErrorMsg, setPwErrorMsg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (nickname && id && pw && pwCheck && isValidId && isValidPw && isValidPwCheck) {
      setIsFilled(true);
    } else if (isFilled === true) {
      setIsFilled(false);
    }
  }, [isValidId, isValidPw, isValidPwCheck]);

  const handleSignUp = async () => {
    const isDuplicatedId = await api.isDuplicated('id', id);
    const isDuplicatedNickname = await api.isDuplicated('name', nickname);
    if (isDuplicatedId || isDuplicatedNickname) {
      isDuplicatedId && (setIsValidId(false), setIdErrorMsg('중복된 아이디입니다'));
      isDuplicatedNickname &&
        (setIsValidNickname(false), setNicknameErrorMsg('중복된 닉네임입니다'));
    } else {
      try {
        const {
          data: { res_code },
        } = await api.signUp(id, pw, nickname);
        if (res_code === 201) {
          setModalVisible(true);
        } else {
          throw new Error('서버 통신 오류');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container>
      <BodyContainer>
        <TitleContainer>
          <TitleText>회원가입</TitleText>
        </TitleContainer>
        <ParamsContainer>
          <NicknameContainer>
            <NicknameText>닉네임</NicknameText>
            <NicknameInput
              placeholder={'닉네임을 입력해주세요'}
              value={nickname}
              onChangeText={(value) => {
                setNickname(value);
                setIsValidNickname(utils.isNickname(value));
                setNicknameErrorMsg('2 ~ 12글자 닉네임  <영문자 or 한글로 시작>');
              }}
              maxLength={12}
              isValidNickname={isValidNickname}
            />
            <NicknameInvalidText>{!isValidNickname && nicknameErrorMsg}</NicknameInvalidText>
          </NicknameContainer>
          <IdContainer>
            <IdText>아이디</IdText>
            <IdInput
              placeholder={'아이디를 입력해주세요'}
              value={id}
              onChangeText={(value) => {
                setId(value);
                setIsValidId(utils.isId(value));
                setIdErrorMsg('6~20자 영문자 또는 숫자  <영문자로 시작>');
              }}
              maxLength={20}
              isValidId={isValidId}
            />
            <IdInvalidText>{!isValidId && idErrorMsg}</IdInvalidText>
          </IdContainer>
          <PwContainer>
            <PwText>비밀번호</PwText>
            <PwInput
              placeholder={'비밀번호를 입력해주세요'}
              value={pw}
              onChangeText={(value) => {
                setPw(value);
                setIsValidPw(utils.isPassword(value));
                setPwErrorMsg('8~16자 영문, 숫자, 특수문자를 최소 한가지씩 조합');
                value && value === pwCheck ? setIsValidPwCheck(true) : setIsValidPwCheck(false);
              }}
              secureTextEntry={true}
              maxLength={16}
              isValidPw={isValidPw}
            />
            <PwInvalidText>{!isValidPw && pwErrorMsg}</PwInvalidText>
          </PwContainer>
          <PwCheckContainer>
            <PwCheckText>비밀번호 재확인</PwCheckText>
            <PwCheckInput
              placeholder={'비밀번호를 다시 입력해주세요'}
              value={pwCheck}
              onChangeText={(value) => {
                setPwCheck(value);
                value && value === pw ? setIsValidPwCheck(true) : setIsValidPwCheck(false);
              }}
              secureTextEntry={true}
              maxLength={16}
              isValidPwCheck={isValidPwCheck}
            />
            <PwCheckInvalidText>
              {!isValidPwCheck && '비밀번호를 다시 확인해주세요'}
            </PwCheckInvalidText>
          </PwCheckContainer>
        </ParamsContainer>
        <SignUpContainer>
          <SignUpBtn disabled={!isFilled} onPress={() => handleSignUp()}>
            <SignUpBtnText>회원가입</SignUpBtnText>
          </SignUpBtn>
        </SignUpContainer>
        <MainModal
          navRouteName="Home"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title="회원가입이 완료되었습니다"
          btnText="로그인"
        />
      </BodyContainer>
    </Container>
  );
};
export default SignUp;
