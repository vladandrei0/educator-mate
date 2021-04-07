import styled from 'styled-components'
import * as colors from '../../styles/colors'
import * as mq from '../../styles/media-queries'


export const FilterContainer = styled.div`
display:${p => p.hidden ? 'none' : 'flex'};
position:relative;
border-radius:5px;
padding-top:30px;
padding-bottom:5px;
margin-bottom:5px;
background:inherit;
width:100%;
${mq['small']}{
    width:100%;
}
.title{
   position: absolute;
   top:5px;
   left:-10px;
   padding: 0 10px;
   border-radius: 5px;
   display:flex;
   align-items:center;
   text-transform:uppercase;
   font-size:small;
   .dot{
      margin-right:5px;
      color:${props => props.children[0].props.children[0].props.kind === 'domeniu' && colors.domeniu ||
   props.children[0].props.children[0].props.kind === 'grupa' && colors.grupa ||
   props.children[0].props.children[0].props.kind === 'tip' && colors.tip ||
   props.children[0].props.children[0].props.kind === 'categorii' && colors.categorii ||
   props.children[0].props.children[0].props.kind === 'teme' && colors.teme}
   }
}
.wrapper{
   display:grid;
   grid-template-columns: repeat( auto-fit, minmax(50%, 1fr) );
   width:100%;
   ${mq['large']}{
      grid-template-columns: repeat( auto-fill, minmax(150px, 1fr) );
   }
   ${mq['medium']}{
      grid-template-columns: repeat( auto-fill, minmax(150px, 1fr) );
   }
}
`