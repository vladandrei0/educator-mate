import prisma from '../../public/lib/utils/prismainstance'

export default async (req, res) => {

   const { query } = req.body
   console.log('body', query)

   try {
      const searchitem = await prisma.searchterms.create({
         data: {
            search: query
         }
      })

      res.status(201)
      res.json({ searchitem })
      // console.log('create', searchitem)
   } catch (error) {
      console.log('err', error)
      res.status(500)
      res.json({ error: 'not able to save search' })
   } finally {
      async () =>
         await prisma.$disconnect()
      console.log('writesearch disconnected')
   }


}