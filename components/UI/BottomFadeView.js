import React from 'react'; 
import styled from 'styled-components/native';
import { Animated, View, Modal, TouchableHighlight, Text } from 'react-native';
import { colors } from '../../theme';

const StyledView = styled.View`
  background-color: rgba(40, 44, 52, .66);
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const ContentView = styled.View`
  background-color: ${colors.light};
  height: 250px;
  width: 100%;
  padding-bottom: 20px;
`;

const ConfirmButton = styled.TouchableHighlight`
  padding: 5px 20px;
`;

const ConfirmButtonText = styled.Text`
  text-align: right;
`;

export class BottomFadeView extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.show !== state.modalVisible) {
      return {modalVisible: props.show};
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(-100),
      modalVisible: props.show,
    }
  }

  setModalVisible = () => {
    this.props.onCloseModal();
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 100,
        duration: 2000,
      }
    ).start();
  }

  render() {
    let { fadeAnim, modalVisible } = this.state;

    return (
      <Animated.View
        style={{
          bottom: fadeAnim,
        }}
      >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
              <StyledView>
                <ContentView>
                  <ConfirmButton onPress={this.setModalVisible} underlayColor={colors.accent}>
                    <ConfirmButtonText>Confirm</ConfirmButtonText>
                  </ConfirmButton>
                  {this.props.children}
                </ContentView>
              </StyledView>
          </Modal>
      </Animated.View>
    );
  }
}