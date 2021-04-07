import prisma from '../../public/lib/utils/prismainstance'


export default async function getManyFise(req, res) {

   try {
      const res = await prisma.fisa.findMany({
         orderBy: {
            createdAt: 'desc'
         },
         include: {
            Domenii: true,
            Teme: true,
            Lectie: true
         }
         // select: { id: true, nume: true, poza: true },
      })
      const latest = JSON.parse(JSON.stringify(res))
      return latest

   } catch (error) {
      console.log('err', error)
      res.status(500)
      res.json({ error: 'not able to get fisa' })
   } finally {
      async () =>
         await prisma.$disconnect()
   }
}
