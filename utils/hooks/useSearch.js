import React from 'react'
import { removeDiacritics } from '../../public/lib/utils/removediacritics'


export function useSearch(searchTerm, fisedinprops) {

   // console.log('fise in hook', fisedinprops)
   const [result, setResult] = React.useState([])

   React.useEffect(() => {
      if (!searchTerm) {
         return
      }
      let fisescore = {}
      let resultarray = []

      const excludedwords = ['fisa', 'fise', 'tema', 'teme', 'material', 'materiale', 'activitate', 'activitati', 'si', 'nici', 'de', 'sau', 'ori', 'daca', 'fiindca', 'findca', 'iar', 'dar', 'insa', 'ci', 'deci', 'ca', 'sa', 'ca sa', 'caci', 'desi', 'incit', 'incat', 'deoarece']
      const trimmed = searchTerm.toLowerCase().trim()
      const nospecialsigns = removeDiacritics(trimmed)
      // remove any spaces and commas
      const splitted = nospecialsigns.split(/[ ,]+/)
      // console.log('splitted', splitted)
      let acceptedwords;
      if (splitted?.length >= 2) {
         acceptedwords = splitted.filter(val => !excludedwords.includes(val))
      } else {
         acceptedwords = splitted;
      }
      // console.log('acc', acceptedwords)
      fisedinprops.filter(fisa => {
         let count = 0

         for (let item of acceptedwords) {
            if (fisa.clean_name.includes(item)) {
               count = count + 4
               // console.log('name')
            }
            if (fisa.Lectie?.nume.includes(item)) {
               count = count + 3
               // console.log('lectie')
            }
            if (fisa.Domenii?.nume.replace(/-/g, ' ').includes(item)) {
               count = count + 2
               // console.log('domeniu')
            }
            if (fisa.instructiuni_clean.replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g, "").includes(item)) {
               count = count + 1
               // console.log('instructiuni')
            }
         }
         fisescore = { ...fisa, score: count }
         if (count > 1) {
            resultarray.push(fisescore)
         }

      })
      let sorted = resultarray.sort(function (a, b) { return (b.score - a.score) })
      setResult(sorted)

   }, [searchTerm])

   return result
}

export function useSearchFilter(searchTerm, temedinprops) {

   const [result, setResult] = React.useState([])

   React.useEffect(() => {
      if (!searchTerm) {
         return
      }
      let one = []
      let two = []
      let three = []
      // console.log(`123:`, one, two, three)
      const excludedwords = ['fisa', 'fise', 'tema', 'teme', 'material', 'materiale', 'activitate', 'activitati', 'si', 'nici', 'de', 'sau', 'ori', 'daca', 'fiindca', 'findca', 'iar', 'dar', 'insa', 'ci', 'deci', 'ca', 'sa', 'ca sa', 'caci', 'desi', 'incit', 'incat', 'deoarece']
      const trimmed = searchTerm.toLowerCase().trim()
      // console.log('fise in hook', trimmed)
      const nospecialsigns = removeDiacritics(trimmed)
      // remove any spaces and commas
      const splitted = nospecialsigns.split(/[ ,]+/)
      // console.log('splitted', splitted)
      let acceptedwords;
      if (splitted?.length >= 2) {
         acceptedwords = splitted.filter(val => !excludedwords.includes(val))
      } else {
         acceptedwords = splitted;
      }
      // console.log('acc', acceptedwords)
      // console.log('teme', temedinprops)
      temedinprops.filter(tema => {
         let count = 0
         const clean = tema.clean + ' ' + removeDiacritics(tema.descriere)
         // console.log('clean', clean)
         for (let item of acceptedwords) {
            if (clean.includes(item)) {
               count++
            }
         }
         if (count === 3) {
            three.push(tema)
         } else if (count === 2) {
            two.push(tema)
         } else if (count === 1) {
            one.push(tema)
         }
      })
      let final = three.concat(two, one)
      setResult(final)

   }, [searchTerm])

   return result
}