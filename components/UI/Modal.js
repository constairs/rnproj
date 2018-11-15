import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme';
import { CloseBtn, CloseBtnText } from '../UI/CloseBtn';

const ModalWrap = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(40, 44, 52, .66);
  display: ${props => props.show ? 'flex' : 'none' };
`;

const ModalBody = styled.View`
  width: 300px;
  position: relative;
  background-color: rgb(40, 44, 52);
  display: ${props => props.show ? 'flex' : 'none' };
  box-shadow: 0 0 10px rgba(0,0,0,.3);
`;

const ModalContent = styled.View`

`;

export class Modal extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.show !== state.showModal) {
      return { showModal: props.show };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: props.show
    };
  }

  closeModal = () => {
    this.setState({
      showModal: false
    });
    this.props.onCloseModal();
  }

  render() {
    const { showModal } = this.state;
    const { component: Component } = this.props;
    return(
      <ModalWrap show={showModal}>
        <ModalBody show={showModal}>
          <CloseBtn onPress={this.closeModal}><CloseBtnText>x</CloseBtnText></CloseBtn>
            <Component {...this.props} />
        </ModalBody>
      </ModalWrap>
    );
  }
}

