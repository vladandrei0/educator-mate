import prisma from '../../public/lib/utils/prismainstance'


export default async function getFisa(req, res) {

   // const { query } = await req.query;
   const { userId, fisaId } = JSON.parse(req.query.query)
   // console.log('userId, fisaId', userId, fisaId)

   try {

      const data_fisa = await prisma.fise_user.upsert({
         where: {
            userId_fisaId: {
               userId: Number(userId),
               fisaId: Number(fisaId)
            }
         },
         update: { no_views: { increment: 1 } },
         create: {
            Fisa: { connect: { id: Number(fisaId) } },
            User: { connect: { id: Number(userId) } },
            no_views: 1
         },
      })

      res.status(201)
      res.json(data_fisa)

   } catch (error) {
      res.status(500)
      res.json({ error: 'not able to get data_fisa' })
   } finally {
      async () =>
         await prisma.$disconnect()
   }
}
