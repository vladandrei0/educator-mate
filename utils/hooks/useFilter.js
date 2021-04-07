import React from 'react'

export function useFilter(fisedinprops, filterquery, tipItems, filtered) {
   const [fisefiltru, setFisefiltru] = React.useState([])

   React.useEffect(() => {

      if (!filterquery.domeniu) {
         setFisefiltru([])
      }

      let countresults = fisedinprops.filter(fisa => fisa.Domenii.nume.replace(/-/g, ' ') === filterquery.domeniu)
      setFisefiltru(countresults)

      if (filterquery.grupa?.length) {
         countresults = countresults.filter(fisa => {
            if (fisa.grupa_mare && filterquery.grupa === 'grupa mare') {
               return true
            } else if (fisa.grupa_mij && filterquery.grupa === 'grupa mijlocie') {
               return true
            } else if (fisa.grupa_mica && filterquery.grupa === 'grupa mica') {
               return true
            }
         })
         setFisefiltru(countresults)

      }


      if (filterquery.tip?.length) {
         for (let item of tipItems) {
            if (filterquery.tip?.indexOf(item) > -1) {
               countresults = countresults.filter(fisa => {
                  if (fisa[`tip_${item}`]) {
                     // console.log('true cica')
                     return true
                  }
               })
               setFisefiltru(countresults)
            }
         }
      }
      if (filterquery.categorii?.length) {
         countresults = countresults.filter(fisa => {
            return fisa.Lectie.nume === filterquery.categorii
         })
         setFisefiltru(countresults)
      }

   }, [filterquery, filtered])
   return fisefiltru

   // if (filtered) {

   // } else {
   //    return []
   // }

}

export function useThemesFilter(latestTeme, filterquery) {

   const [temefiltru, setTemefiltru] = React.useState([])

   React.useEffect(() => {
      if (!filterquery.domeniu) return

      let filterresults = latestTeme.filter(tema => {
         for (let categorie of tema.Categorieontema) {

            if (categorie.CategorieTema.nume === filterquery.domeniu) {
               return true
            }
         }
      })
      setTemefiltru(filterresults)
   }, [filterquery])

   return temefiltru
}

