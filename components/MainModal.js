import { useNavigation } from '@react-navigation/native';
import { Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setIsLogined } from '../redux/userSlice';

const ModalContainer = styled.View`
    width: 100%
    height: 100%
    justify-content: center;
    align-items: center;
    margin-top: 22px;
`;

const ModalView = styled.View`
    width: 70%
    height: 20%
    background-color: white
    border-radius: 20px
    padding: 35px
    align-items: center
    justify-content: center
    shadow-color: #000
    shadow-opacity: 0.25
    shadow-radius: 4px
    elevation: 5
    margin: 20px
`;

const ModalText = styled.Text`
    color: #333333
    font-weight: bold
    text-align: center
    font-size: 20px
    margin-bottom: 15px
`;

const ModalBtnContainer = styled.View`
  width: 70%;
  background-color: #2196f3;
  border-radius: 20px;
  elevation: 2;
`;

const ModalBtn = styled.TouchableOpacity`
  padding: 10px;
`;

const ModalBtnText = styled.Text`
  color: white;
  font-weight: bold
    text-align: center
    font-size: 18px
`;

const MainModal = ({ navRouteName, modalVisible, setModalVisible, title, btnText }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <ModalContainer>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <ModalContainer>
          <ModalView>
            <ModalText>{title}</ModalText>
            <ModalBtnContainer>
              <ModalBtn
                onPress={() => {
                  setModalVisible(false);
                  navigation ?? navigation.navigate(navRouteName);
                }}
              >
                <ModalBtnText>{btnText}</ModalBtnText>
              </ModalBtn>
            </ModalBtnContainer>
          </ModalView>
        </ModalContainer>
      </Modal>
    </ModalContainer>
  );
};
export default MainModal;
