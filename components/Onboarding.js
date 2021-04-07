import React from 'react'
import { Button, Typography } from '@material-ui/core'

function Onboarding({ setFormValues, formValues }) {

   // Material UI takes e.currentTarget vs e.target
   const handleClick = (e) => {
      if (e.currentTarget.value === formValues[e.currentTarget.name]) {
         setFormValues(currentValues => ({
            ...currentValues,
            [e.currentTarget.name]: ''
         }))
      } else {
         setFormValues(currentValues => ({
            ...currentValues,
            [e.currentTarget.name]: e.currentTarget.value
         }))
      }

   }
   React.useEffect(() => {
      if (formValues.rol === 'invatator') {
         setFormValues(currentValues => ({
            ...currentValues,
            onboarding: true
         }))
      } else if (formValues.grupa.length > 0 || formValues.varsta.length > 0) {
         setFormValues(currentValues => ({
            ...currentValues,
            onboarding: true
         }))
      }

   }, [formValues.rol, formValues.grupa, formValues.varsta])

   const cineesti = ['educator', 'parinte', 'invatator']
   const vareducator = ['mica', 'mijlocie', 'mare']
   const varparinte = ['0-2 ani', '2-3 ani', '3-5 ani', '5-7 ani']

   return (
      <>

         <div>
            <Typography variant='h4' gutterBottom>
               În ce rol vei folosi platforma?
               </Typography>
            {cineesti.map(rol => <Button
               key={rol}
               style={{
                  marginRight: '15px',
                  marginTop: '15px',
                  marginBottom: '15px',
                  borderRadius: '20px'
               }}
               color='primary'
               variant={formValues.rol === rol ? 'contained' : 'outlined'}
               name='rol'
               id='rol'
               value={rol}
               type='button'
               disableElevation={formValues.rol === rol}
               // disabled={formValues.rol !== rol && formValues.rol.length !== 0}
               onClick={(e) => handleClick(e)}
            >
               {rol}
            </Button>)}

         </div>
         {(formValues?.rol.length && formValues?.rol === 'educator') ?
            <div>
               <Typography variant='h4' gutterBottom>La ce grupă</Typography>
               {vareducator.map(opt => <Button
                  key={opt}
                  style={{
                     marginRight: '15px',
                     marginTop: '15px',
                     marginBottom: '15px',
                     borderRadius: '20px'
                  }}
                  variant={formValues.grupa === opt ? 'contained' : 'outlined'}
                  color='primary'
                  name='grupa'
                  id='grupa'
                  value={opt}
                  type='button'
                  onClick={(e) => handleClick(e)}
                  disableElevation={formValues.grupa === opt}
               // disabled={formValues.grupa !== opt && formValues.grupa.length !== 0}
               > {opt}
               </Button>)}

            </div> : null}
         {(formValues?.rol.length && formValues?.rol === 'parinte') ?
            <div>
               <Typography variant='h4' gutterBottom>Ce vârstă are copilul</Typography>
               {varparinte.map(opt => <Button
                  key={opt}
                  style={{
                     marginRight: '15px',
                     marginTop: '15px',
                     marginBottom: '15px',
                     borderRadius: '20px'
                  }}
                  variant={formValues.varsta === opt ? 'contained' : 'outlined'}
                  color='primary'
                  name='varsta'
                  id='varsta'
                  value={opt}
                  type='button'
                  onClick={(e) => handleClick(e)}
                  disableElevation={formValues.varsta === opt}
               // disabled={formValues.varsta !== opt && formValues.varsta.length !== 0}
               > {opt}
               </Button>)}

            </div> : null}


      </>
   )
}


export default Onboarding;


