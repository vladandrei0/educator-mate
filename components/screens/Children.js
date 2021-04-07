import React from 'react'
import { Button } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
import CollapsibleTable from '../../components/ChildrenTable'
import Container from '@material-ui/core/Container';


export default function Children() {
   return (
      <div>
         <CssBaseline />
         <Container>
            <h1>Copiii tai</h1>
            <span>
               <Button
                  variant='outlined' style={{
                     marginRight: '15px',
                     borderRadius: '20px'
                  }}>Adauga Copil</Button>
               <Button
                  variant='outlined' style={{
                     marginRight: '15px',
                     borderRadius: '20px'
                  }}>Modifica</Button>
               <Button
                  variant='outlined' style={{
                     marginRight: '15px',
                     borderRadius: '20px'
                  }}>Sterge</Button>


            </span>
            <CollapsibleTable />
         </Container>
      </div>
   )
}
