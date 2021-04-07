import prisma from '../../public/lib/utils/prismainstance'


// like a tema in tema_useri
export default async (req, res) => {

   const { userId, itemId: temaId, liked, no_dw, no_shares } = req.body;

   let isLiked
   let downloads
   let shares

   if (liked === 'undefined') {
      isLiked = undefined
   } else {
      isLiked = liked
   }
   if (!no_dw) {
      downloads = undefined
   } else {
      downloads = Number(no_dw)
   }
   if (!no_shares) {
      shares = undefined
   } else {
      shares = Number(no_shares)
   }
   // console.log('body', userId, fisaId, isLiked, downloads, shares)
   if (userId && temaId) {
      try {
         const updated = await prisma.teme_user.upsert({
            where: {
               temaId_userId: {
                  temaId: Number(temaId),
                  userId: Number(userId)
               }
            },
            update: { no_views: { increment: 1 }, liked: isLiked },
            create: {
               Teme: { connect: { id: Number(temaId) } },
               User: { connect: { id: Number(userId) } },
               no_views: 1,
               liked: isLiked
            }
         })

         // console.log('updated', updated)
         res.status(201)
         res.json(updated)
      } catch (error) {
         console.log('err', error)
         res.status(500)
         res.json({ error: 'not able to save' })
      } finally {
         async () =>
            await prisma.$disconnect()
      }
   } else {
      res.status(500)
      res.json({ error: 'incomplete request, user and fisaId missing' })
   }
}