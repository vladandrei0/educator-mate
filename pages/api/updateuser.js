import prisma from '../../public/lib/utils/prismainstance'

// create a user in User table
export default async function UpdateUser(req, res) {

   const { email, formValues } = req.body
   // const reg_date = new Date(Date.now())
   let rolul, grupa_varsta
   if (formValues.rol?.length) {
      if (formValues.rol === 'educator') {
         rolul = 1
      } else if (formValues.rol === 'parinte') {
         rolul = 2
      } else if (formValues.rol === 'invatator') {
         rolul = 3
      } else {
         rolul = undefined
      }

   }
   if (formValues.grupa?.length) {
      if (formValues.grupa === 'mica') {
         grupa_varsta = 1
      } else if (formValues.grupa === 'mijlocie') {
         grupa_varsta = 2
      } else if (formValues.grupa === 'mare') {
         grupa_varsta = 3
      } else grupa_varsta = undefined
   }
   if (formValues.varsta?.length) {
      if (formValues.varsta === '0-2 ani') {
         grupa_varsta = 4
      } else if (formValues.varsta === '2-3 ani') {
         grupa_varsta = 5
      } else if (formValues.varsta === '3-5 ani') {
         grupa_varsta = 6
      } else if (formValues.varsta === '5-7 ani') {
         grupa_varsta = 7
      } else {
         grupa_varsta = undefined
      }
   }
   try {
      // console.log('create')
      const user = await prisma.user.update({
         where: { email: email },
         data: {
            nume: formValues.nume,
            prenume: formValues.prenume,
            username: formValues.username,
            avatar: Number(formValues.avatar),
            rolId: rolul,
            grupa_varsta: grupa_varsta,
         }
      })

      res.status(201)
      res.json({ user })
   } catch (error) {
      console.log('err', error)
      res.status(500)
      res.json({ error: 'not able to update user' })
   } finally {
      async () =>
         await prisma.$disconnect()
      console.log('update user disconected')
   }


}