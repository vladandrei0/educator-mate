import React from 'react'
import { Input, Spinner } from './utils/lib'
import { BsSearch } from '@react-icons/all-files/bs/BsSearch'
import * as colors from '../styles/colors'
import styled from 'styled-components'
import * as mq from '../styles/media-queries'

const Form = styled.form`
display:flex;
width:190px;
align-items:baseline;
${mq['xsmallAndSmall']}{
      width:100%;
   }
`


// TODO: remove isFetching - find alternative solution
export default function Search({ handleSearchClick, isFetching, placeholder, setSearchTerm }) {

   return (
      <Form
         onSubmit={(e) => handleSearchClick(e)}
      >
         <Input
            placeholder={placeholder}
            id="search"
            type="search"
            style={{
               width: '100%',
               height: '100%',
               border: `solid 1px ${colors.text}`,
               background: 'inherit',
               fontSize: '16px',
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
         <label htmlFor="search">
            <button
               type="submit"
               style={{
                  border: '0',
                  position: 'relative',
                  marginLeft: '-35px',
                  background: 'transparent',
               }}
            >
               {isFetching ? (
                  <Spinner />
               ) : (
                  <BsSearch aria-label="search" />
               )}
            </button>
         </label>
      </Form>
   )
}
