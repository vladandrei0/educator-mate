import prisma from '../../public/lib/utils/prismainstance'
import { slugify } from '../../utils/slugify'
import { removeDiacritics } from '../../public/lib/utils/removediacritics'
// create a user in User table
export default async (req, res) => {

   const { titlul: nume,
      clean,
      poza,
      pdf,
      instructiuni,
      instructiuni_clean,
      materiale,
      tip_colorat,
      tip_decupat,
      tip_lipit,
      tip_scris,
      tip_modelat,
      tip_puzzle,
      tip_poezie,
      tip_poveste,
      tip_proiect,
      grupa_mica,
      grupa_mij,
      grupa_mare,
      slug,
      domeniu,
      tema,
      lectie,
      pdfpages
   } = req.body
   // console.log('body in create fisa',

   //    tip_colorat,
   //    tip_decupat,
   //    tip_lipit,
   //    tip_scris,
   //    tip_puzzle,
   //    tip_poezie,
   //    tip_poveste,
   //    tip_proiect,
   //    pdfpages)

   let colorat, decupat, lipit, scris, modelat, puzzle, poezie, poveste, proiect, mica, mijlocie, mare, temaclean, temaslug
   let posibiltema = "temadefault"

   if (tema !== 'undefined') {
      posibiltema = tema
   }

   temaclean = removeDiacritics(posibiltema)
   temaslug = slugify(temaclean)

   if (tip_colorat === 'true') {
      colorat = true
   } else if (tip_colorat === true) {
      colorat = true
   }
   if (tip_modelat === 'true' || tip_modelat === true) {
      modelat = true
   }
   if (tip_decupat === 'true') {
      decupat = true
   } else if (tip_decupat === true) {
      decupat = true
   }
   if (tip_lipit === 'true' || tip_lipit === true) {
      lipit = true
   }
   if (tip_scris === 'true' || tip_scris === true) {
      scris = true
   }
   if (tip_puzzle === 'true' || tip_puzzle === true) {
      puzzle = true
   }
   if (tip_poezie === 'true' || tip_poezie === true) {
      poezie = true
   }
   if (tip_poveste === 'true' || tip_poveste === true) {
      poveste = true
   }
   if (tip_proiect === 'true' || tip_proiect === true) {
      proiect = true
   }
   if (grupa_mica === 'true' || grupa_mica === true) {
      mica = true
   }
   if (grupa_mij === 'true' || grupa_mij === true) {
      mijlocie = true
   }
   if (grupa_mare === 'true' || grupa_mare === true) {
      mare = true
   }
   try {
      // console.log('create fisa')
      const fisa = await prisma.fisa.create({
         data: {
            nume: nume,
            clean_name: clean,
            instructiuni: instructiuni,
            instructiuni_clean: instructiuni_clean,
            materiale: materiale,
            poza: poza,
            pdf: pdf,
            tip_colorat: colorat,
            tip_decupat: decupat,
            tip_lipit: lipit,
            tip_scris: scris,
            tip_modelat: modelat,
            tip_puzzle: puzzle,
            tip_poezie: poezie,
            tip_proiect: proiect,
            tip_poveste: poveste,
            grupa_mica: mica,
            grupa_mij: mijlocie,
            grupa_mare: mare,
            slug,
            pdfpages: Number(pdfpages),
            Lectie: {
               connectOrCreate: {
                  where: { nume: lectie },
                  create: {
                     nume: lectie,
                     Domenii: {
                        connect: { nume: domeniu.replace(/ /g, '-') }
                     }
                  }
               }
            },
            Domenii: {
               connect: { nume: domeniu.replace(/ /g, '-') }
            },
            Teme: {
               connectOrCreate: {
                  where: { nume: posibiltema },
                  create: { nume: posibiltema, clean: temaclean, slug: temaslug, descriere: 'descriere' }
               }
            },

         }
      })

      res.status(201)
      res.json({ fisa })
   } catch (error) {
      // console.log('err', error)
      res.status(500)
      res.json({ error: 'not able to create fisa' })
   } finally {
      async () =>
         await prisma.$disconnect()
      // console.log('create fisa disconnected')
   }


}