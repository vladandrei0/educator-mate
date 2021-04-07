import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import Onboarding from './Onboarding'
import { Button } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageAvatars from './Avatar'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
   },
   input: {
      display: 'flex',
   },
   button: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      boxShadow: '10px 10px 12px 0 rgba(255, 255, 255, 0.3) inset, -8px -8px 12px 0 rgba(0, 0, 0, .25) inset',
      fontWeight:700,
   },
   accordion: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      background:'inherit',
   },
   accordionSummary: {
      color: theme.palette.primary.main,
      justifyContent: 'center',
   }
}));

function Profile({ profile }) {
   const classes = useStyles()

   const { fbuid: userId } = profile

   const [formValues, setFormValues] = useState({
      username: profile?.username,
      nume: profile?.nume,
      prenume: profile?.prenume,
      avatar: profile?.avatar,
      rol: '',
      grupa: '',
      varsta: '',
      onboarding: false,
      status: 'idle',
      error: null
   })

   // console.log(profile)

   const queryClient = useQueryClient()

   const { mutate, isLoading } = useMutation(updateUser, {
      // When mutate is called:
      onMutate: async ({ formValues }) => {
         console.log('inside muate', formValues)
         // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
         await queryClient.cancelQueries(['profile', userId])
         // Snapshot the previous value
         const previousProfile = queryClient.getQueryData(['profile', userId])
         // Optimistically update to the new value

         queryClient.setQueryData(['profile', userId], old => ({ ...old, formValues }))

         // Return a context object with the snapshotted value
         return { previousProfile }
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newFisa, context) => {
         queryClient.setQueryData(['profile', userId], context.previousLiked)
      },
      // Always refetch after error or success:
      onSettled: () => {
         queryClient.invalidateQueries(['profile', userId])
      },
   })

   async function updateUser(data = {}) {
      const response = await fetch('/api/updateuser', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      });
      return response.json();
   }
   // const handlePreferencesClick = () => {
   //    setFormValues(currentValues => ({
   //       ...currentValues,
   //       status: 'pending'
   //    }))
   //    updateUser({ formValues, email: profile.email }).then(res => {
   //       // console.log('res', res)
   //       setFormValues(curr => ({
   //          ...curr,
   //          username: res.user.username,
   //          nume: res.user.nume,
   //          prenume: res.user.prenume,
   //          avatar: res.user.avatar,
   //          onboarding: false,
   //          status: 'resolved'
   //       }))
   //    })
   // }
   const handlePreferencesClick = () => {
      mutate({ formValues, email: profile.email })
   }
   // console.log('form values', formValues)
   const handleInputChange = (e) => {
      e.persist();
      setFormValues(currentValues => ({
         ...currentValues,
         [e.target.name]: e.target.value
      }))
   }
   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.down('sm'));
   return (
      <div>
         <CssBaseline />
         <Container maxWidth={matches ? 'xs' : 'sm'} style={{ marginTop: 30 }}>
            <Typography variant='h3' >Contul meu</Typography>
            <Typography variant='h2' style={{ marginTop: 30 }}>
               Bine ai venit, {formValues.username}!
            </Typography>

            <ImageAvatars setFormValues={setFormValues} formValues={formValues} />
            <Typography variant='h4' style={{ marginTop: 30 }}>
               Username: {formValues.username}
            </Typography>
            <div className={classes.input}>
               <TextField
                  margin='dense'
                  id="username"
                  label='username' variant="outlined"
                  name="username"
                  value={formValues.username || ''}
                  onChange={handleInputChange}
                  autoComplete={profile?.username}
               />

            </div>
            <Typography variant='h4' style={{ marginTop: 30 }}>
               Prenume: {formValues.prenume}
            </Typography>
            <div className={classes.input}>
               <TextField
                  margin='dense'
                  id="prenume"
                  label="prenume" variant="outlined"
                  name="prenume"
                  value={formValues.prenume || ''}
                  onChange={handleInputChange}
               />

            </div>
            <Typography variant='h4' style={{ marginTop: 30 }}>
               Nume: {formValues.nume}
            </Typography>
            <div className={classes.input}>
               <TextField
                  margin='dense'
                  id="nume"
                  label="nume" variant="outlined"
                  name="nume"
                  value={formValues.nume || ''}
                  onChange={handleInputChange}
               />
            </div>
            <Button size='small' variant='contained' color='primary' className={classes.button}
               onClick={handlePreferencesClick}
            // onClick={() => setFormValues(curr => ({
            //    ...curr,
            //    onboarding: !formValues.onboarding
            // }))}
            >
               Salvează modificările
            </Button>

            <div>
               <Accordion elevation='0' className={classes.accordion}>
                  <AccordionSummary className={classes.accordionSummary}>
                     <Typography variant='h3' color='primary'>
                        Preferintele tale </Typography>
                     <ExpandMoreIcon fontSize='large' style={{
                        justifySelf: 'center',
                     }} />
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordion}>
                     <Onboarding formValues={formValues} setFormValues={setFormValues} />
                     <Button size='small' variant='contained' color='primary' className={classes.button}
                        onClick={handlePreferencesClick}>
                        Salvează preferințele</Button>
                  </AccordionDetails>
               </Accordion>
            </div>
         </Container>
      </div>
   )
}

export default Profile
