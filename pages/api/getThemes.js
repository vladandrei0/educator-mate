import prisma from '../../public/lib/utils/prismainstance'

export default async function getThemes(req, res) {
   try {

      const res = await prisma.teme.findMany({
         orderBy: {
            createdAt: 'desc'
         },
         where: {
            nume: {
               not: 'default'
            }
         },
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
      })
      const latestTeme = JSON.parse(JSON.stringify(res))

      // console.log('teme in api', latestTeme)

      return latestTeme
   } catch (error) {
      console.log(error.message)
      return ('nothing was returned')

   } finally {
      async () => await prisma.$disconnect()
   }
}