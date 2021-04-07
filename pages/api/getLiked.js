import prisma from '../../public/lib/utils/prismainstance'

export default async function getLiked(req, res) {

   const { query: userId } = req.query
   // console.log('userId', userId)
   try {
      const liked = await prisma.fise_user.findMany({
         where: {
            userId: Number(userId),
            liked: true
         },
         select: { fisaId: true, liked: true, userId: true }
      })
      // get only the id from query
      const result = liked.map(el => el.fisaId)
      // console.log('liked ->', res)
      res.status(201)
      res.json(result)
   } catch (error) {
      res.status(500)
      res.json({ error: 'not able to get liked fise' })
   } finally {
      async () =>
         await prisma.$disconnect()
   }

}