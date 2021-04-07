import styled from 'styled-components'
import * as mq from '../styles/media-queries'

/**
 * This component wraps page content sections (eg header, footer, main).
 * It provides consistent margin and max width behavior.
 */

export const Container = styled.div`
  display: grid;
    grid-template-columns: 1fr min(95ch, 100%) 1fr;
    height:100%;
    > * {
    grid-column: 2;
    }
  ${mq['xsmallAndSmall']}{
    padding-left:30px;
    padding-right:30px;
  }
  ${mq['xsmall']}{
    padding-left:30px;
    padding-right:30px;
  }
`

