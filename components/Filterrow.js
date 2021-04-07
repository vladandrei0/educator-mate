import React from 'react'
import { BsCircleFill } from '@react-icons/all-files/bs/BsCircleFill'
import { FilterContainer } from '../components/utils/FilterContainer'
import { Checkbox } from './utils/lib'

const FilterRow = ({ id = 'domeniu',
   title = 'Domeniul',
   items,
   filterquery = {},
   setFilterquery,
   setFiltered,
   multiple,
   filtered,
   kind }) => {

   const [tags, setTags] = React.useState([])
   // console.log('tags', id, tags)

   // clear all tags when there is no filtering action
   React.useEffect(() => {
      if (filtered === false) {
         // console.log('e fals ba')
         setTags([])
      }
   }, [filtered])

   React.useEffect(() => {
      if (id !== 'domeniu') {
         setTags([])
      }
   }, [filterquery])



   const handleTagChange = (tag, checked, multiple = false) => {
      // if the same tag is clicked again, remove it 
      if (tags.includes(tag)) {
         const checkedTags = tags.filter(t => t !== tag)
         if (id === 'domeniu') {
            setTags(checkedTags)
            if (!checkedTags.length) {
               setFiltered(false)
            }
            setFilterquery({
               [id]: checkedTags
            })
         } else {
            setTags(checkedTags)
            setFilterquery(values => ({
               ...values,
               [id]: checkedTags
            }))
         }
      } else {
         // if the filter is suppossed to hold multiple clicked tags at once
         if (multiple) {
            const nextSelectedTags = checked ? [...tags, tag] : selectedOpTags.filter(t => t !== tag);
            setTags(nextSelectedTags);
            setFilterquery(values => ({
               ...values,
               [id]: nextSelectedTags
            }))
         } else {
            // if the filter is holding only one tag
            if (id === 'domeniu') {
               setFiltered(false)
               const nextSelectedTags = checked ? [tag] : selectedOpTags.filter(t => t !== tag);
               setTags(nextSelectedTags);
               setFilterquery({
                  [id]: tag
               })

            } else {
               const nextSelectedTags = checked ? [tag] : selectedOpTags.filter(t => t !== tag);
               setTags(nextSelectedTags);
               setFilterquery(values => ({
                  ...values,
                  [id]: tag
               }))
            }
         }
         setFiltered(true)
      }
   }
   let hidden;
   if (id === 'domeniu') {
      hidden = false;
   } else {
      hidden = !filtered;
   }
   return (
      <FilterContainer hidden={hidden}>
         <div className='title'>
            <BsCircleFill className='dot' kind={kind} />
            {title}
         </div>
         <div className='wrapper'>
            {items?.map(item => {
               return (
                  <Checkbox key={item} type='checkbox' kind={kind}
                     checked={tags.indexOf(item) > -1}
                     tag={item}
                     onChange={checked => handleTagChange(item, checked, multiple)}
                  />
               )
            })}
         </div>
      </FilterContainer>
   )
}

export default FilterRow