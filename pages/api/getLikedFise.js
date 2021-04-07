import prisma from '../../public/lib/utils/prismainstance'

export default async function getLikedFise(req, res) {

   const { query: userId } = req.query
   // console.log('userId', userId)
   try {
      const liked = await prisma.fise_user.findMany({
         where: {
            userId: Number(userId),
            liked: true
         },
         include: {
            Fisa: {
               include: {
                  Domenii: true,
                  Teme: true,
                  Lectie: true
               }
            }
         }
      })
      const reversed = liked.reverse()
      // console.log('liked ->', res)
      res.status(201)
      res.json(reversed)
   } catch (error) {
      res.status(500)
      res.json({ error: 'not able to get liked fise' })
   } finally {
      async () =>
         await prisma.$disconnect()
   }

}