import React from 'react';
import emailjs, { init } from 'emailjs-com';
import styled from 'styled-components';
import { Container } from './Container'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

export const Feedback = React.memo(function FeedbackForm() {
   const userId = process.env.USER_ID;
   const template = process.env.TEMPLATE_ID;
   const serviceId = process.env.SERVICE_ID;
   // init(userId);
   // console.log(userId, template, serviceId)
   const [data, setData] = React.useState({
      email: '',
      feedback: '',
      status: 'idle'
   })
   const { email, feedback, status } = data;

   function sendEmail(e) {
      e.preventDefault();
      let templateParams = {
         from_name: email,
         message: feedback,
      }
      if (feedback && email) {
         setData(currentValues => ({
            ...currentValues,
            status: 'pending'
         }))
         // new Promise(r =>
         //    setTimeout(r, 3000)).then(() => setData({ status: 'resolved' }))

         emailjs.send(serviceId, template, templateParams, userId)
            .then(() => {
               setData({ status: 'resolved' });
            }, (error) => {
               setData({ status: 'rejected' });
               console.log(error.text);
            });
      }
   }
   const handleChange = (e) => {
      setData({
         ...data,
         [e.target.name]: e.target.value
      });
   }
   if (status === 'idle') {
      return (
         <Container>
            <FormWrapper id="contact-us">
               <Typography variant='subtitle1'>Care este nevoia ta cea mai mare?</Typography>
               <Typography variant='subtitle2'>Dacă ar fi să te ajutăm cu un singur lucru, care ar fi acesta?</Typography>
               <form onSubmit={sendEmail} id="feedback">
                  <TextField
                     id="standard-multiline-flexible"
                     label="Email"
                     value={data.email}
                     onChange={handleChange}
                     required
                     placeholder="Email-ul tau..."
                     margin='dense' variant="outlined"
                  />
                  <TextField
                     id="outlined-multiline-static"
                     label="Mesajul tau aici..."
                     multiline
                     rows={4}
                     value={data.feedback}
                     onChange={handleChange}
                     required
                     margin='dense' variant="outlined"
                  />
                  <Button type="submit" variant='contained' color='primary'>
                     <span>Trimite</span>
                  </Button>
               </form>
            </FormWrapper>

         </Container>
      );
   } else if (status === 'pending') {
      return (
         <Container>
            <FormWrapper id="contact-us">
               <p style={{ marginBottom: "3rem" }}>Am împachetat mesajul și l-am trimis</p>
            </FormWrapper>


         </Container>)
   } else if (status === 'resolved') {
      return (
         <Container>
            <FormWrapper id="contact-us">
               <p style={{ marginBottom: "3rem" }}>Multumim!<br />Mesajul a fost transmis </p>
            </FormWrapper>

         </Container>)
   } else if (status === 'rejected') {
      return (
         <Container>

            <p style={{ marginBottom: "3rem" }}>A apărut o eroare. Te rog sa dai refresh și să încerci din nou</p>

         </Container>)
   }
})

const FormWrapper = styled.div`
   display:flex;
   flex-direction:column;
   width:min(35ch, 250px);
   margin:80px auto 40px auto;
   text-align:center;
   form{
      display:flex;
      flex-direction:column;
   }
`
