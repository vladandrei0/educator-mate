import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import Modal from 'react-modal';
import "@reach/dialog/styles.css";
import useLockBodyScroll from '../utils/hooks/useLockBodyScroll'
import styled from 'styled-components'
import { CircleButton } from '../components/utils/lib'
import * as mq from '../styles/media-queries'

Modal.setAppElement('#__next')

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

const ModalContext = React.createContext()

function ModalContainer(props) {
  const [isOpen, setIsOpen] = React.useState(false)
  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function ModalOpenButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  useLockBodyScroll(isOpen);
  return (
    isOpen &&
    <StyledModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} {...props}
    />
  )
}

function ModalContents({ title, children, ...props }) {

  return (
    <ModalContentsBase {...props}>
      <div style={{
        display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex:'100'}}>
        <ModalDismissButton >
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 style={{ textAlign: 'center', fontSize: '2em' }}>{title}</h3>
      {children}
    </ModalContentsBase>
  )
}

export { ModalContainer, ModalDismissButton, ModalOpenButton, ModalContents }

const StyledModal = styled(Modal)`
  max-width: 450px;
  border-radius: 3px;
  padding-bottom: 3.5em;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.2);
  margin: 20vh auto;
  background:white;
  position:relative;
  z-index:100;
  
  :focus{
    outline:none;
  }
  
  ${mq['smallAndMedium']} {
    width:100%;
    margin: 10vh auto;
  };
  
`