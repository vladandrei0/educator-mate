import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { removeDiacritics } from '../public/lib/utils/removediacritics'
import { domeniuItems, bunePentruItems, tipItems, lectii, temefisa } from '../public/lib/utils/filteritems'
import { slugify } from '../utils/slugify'


export default function AddFisaForm() {
   const [data, setData] = useState({})
   // console.log('data', data)

   React.useEffect(() => {
      if (!data.titlul) return

      let clean = removeDiacritics(data.titlul.toLowerCase(), '')
      let slug = slugify(clean)
      setData(currentValues => ({
         ...currentValues,
         clean: clean,
         slug: slug
      }))
   }, [data.titlul])

   React.useEffect(() => {
      if (!data.instructiuni) return

      let clean = removeDiacritics(data.instructiuni.toLowerCase(), '')
      setData(currentValues => ({
         ...currentValues,
         instructiuni_clean: clean,
      }))
   }, [data.instructiuni])

   const handleChange = (e) => {
      setData(currentValues => ({
         ...currentValues,
         [e.target.name]: e.target.value
      }))
   };

   const handleTipChange = (e) => {
      setData(currentValues => ({
         ...currentValues,
         [e.target.name]: !data[e.target.name]
      }))
   }
   const handleSelectChange = (e) => {
      e.persist()
      setData(currentValues => ({
         ...currentValues,
         [e.target.name]: e.target.value
      }))
   }
   // TODO create alert when upload is ok

   const handleSubmit = (e) => {
      e.preventDefault()
      createFisa(data).then(res => console.log('res in front', res))
   }
   async function createFisa(data = {}) {
      const response = await fetch('/api/createfisa', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      });
      return response.json()
   }

   return (
      <Container maxWidth="md" >
         <form onSubmit={handleSubmit}>
            <h2>Form introducere fisa</h2>
            <h3>Titlul fisei</h3>
            <TextField fullWidth
               required
               margin='dense'
               id="titlul-fisei"
               label="Titlul fisei" variant="outlined"
               helperText='* obligatoriu'
               onChange={handleChange}
               name="titlul" />
            <h3>Titlu curatat</h3>
            <TextField fullWidth
               margin='dense'
               id="titlul-clean"
               label="fara diacritice" variant="outlined"
               helperText='read-only'
               name="clean"
               value={data.clean || ''}
               InputProps={{
                  readOnly: true,
               }} />
            <h3>Slug</h3>
            <TextField fullWidth
               margin='dense'
               id="slug"
               label="slug" variant="outlined"
               helperText='read-only'
               name="slug"
               value={data.slug || ''}
               InputProps={{
                  readOnly: true,
               }} />
            <h3>Instructiuni</h3>
            <TextField fullWidth
               required
               margin='dense'
               id="instructiuni"
               label="Instructiuni" variant="outlined"
               multiline
               rowsMax={8}
               onChange={handleChange}
               name="instructiuni" />
            <h3>Instructiuni Clean</h3>
            <TextField fullWidth
               required
               margin='dense'
               id="instructiuni_clean"
               label="Instructiuni Clean" variant="outlined"
               multiline
               rowsMax={8}
               helperText='read-only'
               name="instructiuni_clean"
               value={data.instructiuni_clean || ''}
               InputProps={{
                  readOnly: true,
               }} />
            <h3>Materiale</h3>
            <TextField fullWidth
               style={{ paddingBottom: 26 }}
               margin='dense'
               id="materiale"
               label="Materiale" variant="outlined"
               onChange={handleChange}
               name="materiale" />
            <div>
               <TextField
                  required
                  id="select-domeniu"
                  style={{ marginRight: 16 }}
                  select
                  label="Domeniul"
                  value={data.domeniu || ''}
                  onChange={handleSelectChange}
                  helperText="Selecteaza domeniul"
                  name='domeniu'
               >
                  {domeniuItems.map((option) => (
                     <MenuItem key={option} defaultValue={option} value={option}>
                        {option}
                     </MenuItem>
                  ))}
               </TextField>
               <TextField
                  id="select-tema"
                  style={{ marginRight: 16 }}
                  select
                  label="Tema"
                  value={data.tema || ''}
                  onChange={handleSelectChange}
                  helperText="Selecteaza tema"
                  name='tema'
               >
                  {temefisa.map((option) => (
                     <MenuItem key={option} defaultValue={option || 'default'} value={option}>
                        {option}
                     </MenuItem>
                  ))}
               </TextField>
               {data.domeniu ? <TextField
                  required
                  id="select-lectie"
                  style={{ marginRight: 16 }}
                  select
                  label="Lectia"
                  value={data.lectie || ''}
                  onChange={handleSelectChange}
                  helperText="Selecteaza Lectia"
                  name='lectie'
               >
                  {lectii[data.domeniu].map((option) => (
                     <MenuItem key={option} defaultValue={option} value={option}>
                        {option}
                     </MenuItem>
                  ))}
               </TextField> : null}
            </div>
            <div>
               <h3>Link poza</h3>
               <TextField fullWidth
                  required
                  margin='dense'
                  id="link-poza"
                  label="link poza" variant="outlined"
                  onChange={handleChange}
                  name="poza" />
            </div>
            <div>
               <h3>Link pdf</h3>
               <TextField fullWidth
                  required
                  margin='dense'
                  id="link-pdf"
                  label="link pdf" variant="outlined"
                  onChange={handleChange}
                  name="pdf"
                  style={{ marginBottom: '16px' }} />
            </div>
            <div>
               <InputLabel htmlFor="pdfpages">Numar de pagini</InputLabel>
               <OutlinedInput
                  required
                  id='pdfpages'
                  type='number'
                  value={data.pdfpages || ''}
                  name='pdfpages'
                  onChange={handleChange} />
            </div>
            <div>
               <span>
                  <h3>Ce tip</h3>
                  <FormControl required>
                     <span>
                        {tipItems.map(
                           (tip, index) => <FormControlLabel
                              control={<Checkbox name={`tip_${tip}`} />}
                              label={tip}
                              value={!data[`tip_${tip}`]}
                              key={tip}
                              onChange={handleTipChange}
                           />
                        )}
                     </span>
                  </FormControl>
               </span>
            </div>
            <div>
               <span>
                  <h3>Pentru ce grupa</h3>
                  {['grupa_mica', 'grupa_mij', 'grupa_mare'].map(
                     (grupa, index) => <FormControlLabel
                        control={<Checkbox name={grupa} />}
                        label={grupa}
                        value={!data[grupa] || false}
                        key={grupa}
                        onChange={handleTipChange}
                     />
                  )}
               </span>
            </div>
            <br></br>
            <Button variant="contained" color="primary" type="submit">Salveaza Fisa</Button>
         </form>
      </Container>
   )
}

