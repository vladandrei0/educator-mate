import React from 'react'
import FilterRow from './Filterrow'
import ClearIcon from '@material-ui/icons/Clear';
import { filtruteme } from '../public/lib/utils/filteritems'
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   filter: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '10px',
      marginBottom: '20px',
      position:'relative',
   },
   deleteFilter: {
      position: 'absolute',
      right: 5,
      top: 0,
      fontSize:'10px',
   },
})

export default function FilterTeme({
   filtered,
   setFilterquery,
   setFiltered,
   handleFetchClick
}) {
   // console.log('filterquery', filterquery.domeniu)
   const classes = useStyles();

   return (
      <div className={clsx(classes.filter)}>
         {/* <div style={{
            position: 'relative',
         }}> */}
            
            <Chip className={clsx(classes.deleteFilter)}
               label="Sterge filtrul"
               color="primary"
               size="small"
               clickable
               onClick={() => {
                  setFiltered(false)
                  setFilterquery({})
               }}
               onDelete={() => {
                  setFiltered(false)
                  setFilterquery({})
               }}
               deleteIcon={<ClearIcon />}
               variant="outlined"
         />
         <FilterRow
               title='Categorii de Teme'
               id='domeniu'
               items={filtruteme}
               filtered={filtered}
               setFilterquery={setFilterquery}
               setFiltered={setFiltered}
               kind='teme'
            />
         {/* </div> */}
      </div>
   )
}


