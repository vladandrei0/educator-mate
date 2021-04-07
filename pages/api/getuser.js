import prisma from '../../public/lib/utils/prismainstance'

export default async function getUser(req, res) {

   const { fbuid } = req.query;
   // console.log('fbuid', fbuid)
   try {
      const profile = await prisma.user.findUnique({
         where: { fbuid },

      })
      // if (profile === null) {
      //    res.status(202)
      //    res.json({ error: 'no user for this uid' })
      // }
      res.status(201)
      res.json(profile)
   } catch (error) {
      res.status(500)
      res.json({ error: 'not able to get user' })
   } finally {
      async () =>
         await prisma.$disconnect()
      console.log('getuser disconnected')
   }
}