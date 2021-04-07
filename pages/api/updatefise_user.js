import prisma from '../../public/lib/utils/prismainstance'


// like a fisa in fise_useri
export default async (req, res) => {

   const { userId, itemId: fisaId, liked, no_dw, no_shares } = req.body;

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
   if (userId && fisaId) {
      try {
         const updated = await prisma.fise_user.upsert({
            where: {
               userId_fisaId: {
                  userId: Number(userId),
                  fisaId: Number(fisaId)
               }
            },
            update: { liked: isLiked, no_dw: downloads, no_shares: shares },
            create: {
               Fisa: { connect: { id: Number(fisaId) } },
               User: { connect: { id: Number(userId) } },
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