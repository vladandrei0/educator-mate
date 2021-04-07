import prisma from '../../public/lib/utils/prismainstance'

// create a user in User table
export default async function CreateUser(req, res) {

   const { email, username, fbuid, rol, grupa, varsta } = req.body
   console.log('body', req.body)
   // rol: educator = 1, parinte = 2, invatator = 3
   // grupa mica = 1, mij = 2, mare =3, 0-2 = 4, 2-3 = 5, 3-5 = 6 5-7 = 7
   const reg_date = new Date(Date.now())
   let rolul, grupa_varsta
   if (rol?.length) {
      if (rol === 'educator') {
         rolul = 1
      } else if (rol === 'parinte') {
         rolul = 2
      } else if (rol === 'invatator') {
         rolul = 3
      } else {
         rolul = undefined
      }

   }
   if (grupa?.length) {
      if (grupa === 'mica') {
         grupa_varsta = 1
      } else if (grupa === 'mijlocie') {
         grupa_varsta = 2
      } else if (grupa === 'mare') {
         grupa_varsta = 3
      } else grupa_varsta = undefined
   }
   if (varsta?.length) {
      if (varsta === '0-2 ani') {
         grupa_varsta = 4
      } else if (varsta === '2-3 ani') {
         grupa_varsta = 5
      } else if (varsta === '3-5 ani') {
         grupa_varsta = 6
      } else if (varsta === '5-7 ani') {
         grupa_varsta = 7
      } else {
         grupa_varsta = undefined
      }
   }
   try {
      // console.log('create')
      const user = await prisma.user.upsert({
         where: { fbuid: fbuid },
         update: {
            email: email
         },
         create: {
            email: email,
            username: username,
            fbuid: fbuid,
            registration_date: reg_date,
            rolId: rolul,
            grupa_varsta: grupa_varsta
         }
      })
      res.status(201)
      res.json({ user })
   } catch (error) {
      console.log('err', error)
      res.status(500)
      res.json({ error: 'not able to create user' })
   } finally {
      async () =>
         await prisma.$disconnect()
      console.log('create user disconected')
   }

}