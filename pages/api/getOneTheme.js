import prisma from '../../public/lib/utils/prismainstance'

export default async function getOneTheme(req, res) {
   const slug = req
   // console.log('req', req)
   // TODO: protect route from invalid requests
   try {
      const res = await prisma.teme.findFirst({
         where: {
            slug: slug
         },
         include: {
            Fisa: {
               where: {
                  Teme: { slug: slug }
               },
               select: { id: true, nume: true, poza: true, slug: true, Domenii: true, Lectie: true }
            }
         }
      })
      const fiseTema = JSON.parse(JSON.stringify(res))
      // console.log('tema', fiseTema)
      return fiseTema
   } catch (error) {
      console.log(error.message)
   } finally {
      async () => await prisma.$disconnect()
   }
}