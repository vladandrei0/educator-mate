import prisma from '../../public/lib/utils/prismainstance'


export default async function getFisa(req, res) {

   try {
      const res = await prisma.fisa.findFirst({
         where: { slug: req },
         include: {
            Domenii: true,
            Teme: true,
            Lectie: true
         }
      })

      const fisa = JSON.parse(JSON.stringify(res))
      // console.log('fisa in getonefisa', fisa)
      return fisa

   } catch (error) {
      console.log('err', error.message)
      return ('nothing was returned')
   } finally {
      async () =>
         await prisma.$disconnect()
   }
}
