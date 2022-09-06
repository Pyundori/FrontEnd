import { useEffect, useState } from 'react';
import styled from 'styled-components';
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
const Title = styled.Text`
  font-size: 35px;
  color: #68c2ff;
`;

const SignUpContainer = styled.View`
  width: 100%
  height: 88%
  align-items: center
  justify-content: flex-start
`;

const IdContainer = styled.View`
  width: 85%;
  height: 20%;
  margin-top: 5%;
`;

const Id = styled.Text`
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

const Pw = styled.Text`
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

const PwCheck = styled.Text`
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

const SignUpBtnContainer = styled.View`
  width: 100%
  height: 30%
  align-items: center
  justify-content: flex-end
  padding-bottom: 15%
`;

const SignUpBtn = styled.TouchableOpacity`
  width: 60%
  background-color: #5ebeff;
  padding: 3%;
  border-radius: 15px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)}
`;

const SignUpText = styled.Text`
  font-size: 20px;
  color: white;
  text-align: center;
`;

const SignUp = ({ navigation }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [isValidId, setValidId] = useState(true);
  const [isValidPw, setValidPw] = useState(true);
  const [isValidPwCheck, setValidPwCheck] = useState(true);
  const [isFilled, setIsFilled] = useState(false);
  const [IdErrorMsg, setIdErrorMsg] = useState('');
  const [PwErrorMsg, setPwErrorMsg] = useState('');

  useEffect(() => {
    if (id && isValidId && isValidPw && isValidPwCheck) {
      setIsFilled(true);
    } else if (isFilled === true) {
      setIsFilled(false);
    }
  }, [isValidId, isValidPw, isValidPwCheck]);

  return (
    <Container>
      <BodyContainer>
        <TitleContainer>
          <Title>회원가입</Title>
        </TitleContainer>
        <SignUpContainer>
          <IdContainer>
            <Id>아이디</Id>
            <IdInput
              placeholder={'아이디를 입력해주세요'}
              value={id}
              onChangeText={(value) => {
                setId(value);
                utils.isId(value)
                  ? setValidId(true)
                  : (setValidId(false), setIdErrorMsg('6~20자 영문자 또는 숫자, 영문자로 시작'));
              }}
              maxLength={20}
              isValidId={isValidId}
            />
            <IdInvalidText>{!isValidId && IdErrorMsg}</IdInvalidText>
          </IdContainer>
          <PwContainer>
            <Pw>비밀번호</Pw>
            <PwInput
              placeholder={'비밀번호를 입력해주세요'}
              value={pw}
              onChangeText={(value) => {
                setPw(value);
                utils.isPassword(value)
                  ? setValidPw(true)
                  : (setValidPw(false),
                    setPwErrorMsg('8~16자 영문, 숫자, 특수문자를 최소 한가지씩 조합'));
                value && value === pwCheck ? setValidPwCheck(true) : setValidPwCheck(false);
              }}
              secureTextEntry={true}
              maxLength={20}
              isValidPw={isValidPw}
            />
            <PwInvalidText>{!isValidPw && PwErrorMsg}</PwInvalidText>
          </PwContainer>
          <PwCheckContainer>
            <PwCheck>비밀번호 재확인</PwCheck>
            <PwCheckInput
              placeholder={'비밀번호를 다시 입력해주세요'}
              value={pwCheck}
              onChangeText={(value) => {
                setPwCheck(value);
                value && value === pw ? setValidPwCheck(true) : setValidPwCheck(false);
              }}
              secureTextEntry={true}
              maxLength={16}
              isValidPwCheck={isValidPwCheck}
            />
            <PwCheckInvalidText>{!isValidPwCheck && '비밀번호가 달라요'}</PwCheckInvalidText>
          </PwCheckContainer>
          <SignUpBtnContainer>
            <SignUpBtn disabled={!isFilled}>
              <SignUpText>회원가입</SignUpText>
            </SignUpBtn>
          </SignUpBtnContainer>
        </SignUpContainer>
      </BodyContainer>
    </Container>
  );
};
export default SignUp;
