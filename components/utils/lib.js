import styled from 'styled-components'
import { FaSpinner } from 'react-icons/fa'
import { keyframes } from '@emotion/core'
import * as colors from '../../styles/colors'
import * as mq from '../../styles/media-queries'

const Title = styled.h1`
    font-size:48px;
    display:block;
    align-self: ${props => props.center && 'center'};
    ${mq['small']}{
      font-size:xx-large;
    }
`
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})
const StyledButton = styled.button`
  color:white;
  background-color:${colors.green};
  font-size:medium;
  border: 0;
  padding:5px 10px;
  width:${props => props.block ? '100%' : 'auto'};
  border-radius:5px;
  align-self: center;
`
//https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd

const CheckboxContainer = styled.div`
    display: inline-block;
    color: ${props => props.checked ? 'white' : colors.text};
    background:${props => props.checked ?
    (props.children[0].props.kind === 'domeniu' && colors.domeniu ||
      props.children[0].props.kind === 'grupa' && colors.grupa ||
      props.children[0].props.kind === 'tip' && colors.tip ||
      props.children[0].props.kind === 'categorii' && colors.categorii ||
      props.children[0].props.kind === 'teme' && colors.teme)
    : 'white'};
    padding: 2px 5px;
    border: solid 1px;
    border-color:${props => (props.children[0].props.kind === 'domeniu' && colors.domeniu ||
    props.children[0].props.kind === 'grupa' && colors.grupa ||
    props.children[0].props.kind === 'tip' && colors.tip ||
    props.children[0].props.kind === 'categorii' && colors.categorii ||
    props.children[0].props.kind === 'teme' && colors.teme)};
    text-transform: uppercase;
    font-size: x-small;
    margin: 3px 5px;
    text-align: center;
    white-space: nowrap;
    border-radius: .125rem;
    ${mq['xsmall']} {
    font-size: xx-small;
    white-space: wrap;
  };
    span{
      display:block;
      :hover{
        cursor:pointer;
      }
    }
`

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  white-space: nowrap;
  opacity:0;
`

const Checkbox = ({ checked, tag, ...props }) => (
  <CheckboxContainer checked={checked}>
    <HiddenCheckbox checked={checked} {...props} />
    <span onClick={props.onChange} id={tag}>{tag}</span>
  </CheckboxContainer>
)

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px 16px;
  font-size: small;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: 'none';
    
  &:focus, &:active{
  border: solid 2px ${colors.green};
}
`
const ErrorMessage = styled.span`
  color: red;
`
const CircleButton = styled.button`
  border-radius: 30px;
  padding: 0;
  margin:10px;
  width: 40px;
  height: 40px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.text};
  cursor: pointer;
  `



export { Spinner, StyledButton, Checkbox, Title, Input, ErrorMessage, CircleButton }