import prisma from '../../public/lib/utils/prismainstance'

export default async function getLikedThemesWithContent(req, res) {

   const { query: userId } = req.query
   try {
      const liked = await prisma.teme_user.findMany({
         where: {
            userId: Number(userId),
            liked: true
         },
         include: {
            Teme: {
               include: {
                  Categorieontema: {
                     include: {
                        CategorieTema: true
                     }
                  },
                  Fisa: {
                     select: { nume: true }
                  }
               }
            }
         }
      })
      const reversed = liked.reverse()
      // console.log('liked ->', liked)
      res.status(201)
      res.json(reversed)
   } catch (error) {
      res.status(500)
      res.json({ error: 'not able to get liked teme' })
   } finally {
      async () =>
         await prisma.$disconnect()
   }

}