import prisma from '../../public/lib/utils/prismainstance'

export default async function getLikedThemes(req, res) {

   const { query: userId } = req.query
   // console.log('userId', userId)
   try {
      const liked = await prisma.teme_user.findMany({
         where: {
            userId: Number(userId),
            liked: true
         },
         select: { temaId: true, liked: true, userId: true }
      })
      // get only the id from query
      const result = liked.map(el => el.temaId)
      // console.log('liked ->', result)
      res.status(201)
      res.json(result)
   } catch (error) {
      res.status(500)
      res.json({ error: 'not able to get liked teme' })
   } finally {
      async () =>
         await prisma.$disconnect()
   }

}