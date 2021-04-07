
import prisma from '../../public/lib/utils/prismainstance'

export default async (req, res) => {

   const { query } = req.body
   const filterdata = JSON.stringify(query)
   // console.log('body', query)

   try {
      const filteritem = await prisma.filterterms.create({
         data: {
            filter: filterdata
         }
      })

      res.status(201)
      res.json({ filteritem })
   } catch (error) {
      console.log('err', error)
      res.status(500)
      res.json({ error: 'not able to save filter' })
   } finally {
      async () =>
         await prisma.$disconnect()
   }


}