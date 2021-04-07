import React from 'react'
import FilterRow from './Filterrow'
import { domeniuItems, bunePentruItems, tipItems, lectii } from '../public/lib/utils/filteritems'
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
   form: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '10px',
      marginBottom: '20px',
      position: 'relative',
      background:'inherit',
   },
   deleteForm: {
      position: 'absolute',
      right: 5,
      top: 0,
      fontSize: '10px',
   },
   button: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 70,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      position: "fixed",
      bottom: 0,
      left: 0,
      width: '100%',
      zIndex: 9,
      display: 'flex',
      "@media (min-width: 990px)": {
         position: "relative",
         height: 50,
      }
   },
   buttonHidden: {
      display: 'none',
   },
   marginBottom: {
      bottom:60,
   }
})

export function FilterForm({
   fisefiltru,
   filtered,
   setFilterquery,
   setFiltered,
   filterquery,
   handleFilterClick,
}) {

   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.down('sm'));
   const margin = matches ? '80px' : '10px'
   const classes = useStyles();

   return (
      <form className={clsx(classes.form)}
         id="filtru"
         onSubmit={handleFilterClick}>
         <div style={{
            position: 'relative',
         }}>
            
            <Chip className={clsx(classes.deleteForm)}
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
               title='Domeniul'
               id='domeniu'
               items={domeniuItems}
               filtered={filtered}
               setFilterquery={setFilterquery}
               setFiltered={setFiltered}
               kind='domeniu'
            />
         </div>
         {filterquery?.domeniu?.length ? (
            <>
               <FilterRow
                  title='Bune pentru'
                  id='grupa'
                  items={bunePentruItems}
                  filtered={filtered}
                  filterquery={filterquery.domeniu || null}
                  setFilterquery={setFilterquery}
                  setFiltered={setFiltered}
                  kind='grupa'
               />
               <FilterRow
                  title='Tip'
                  id='tip'
                  items={tipItems}
                  filtered={filtered}
                  filterquery={filterquery.domeniu || null}
                  setFilterquery={setFilterquery}
                  setFiltered={setFiltered}
                  multiple={true}
                  kind='tip'
               />
               <FilterRow
                  title='Categorii'
                  id='categorii'
                  items={lectii[filterquery.domeniu]}
                  filtered={filtered}
                  filterquery={filterquery.domeniu || null}
                  setFilterquery={setFilterquery}
                  setFiltered={setFiltered}
                  kind='categorii'
               />
            </>) : (null)
         }
         {filterquery.domeniu?.length ?
            <Button
               className={clsx(classes.button, {
                  [classes.buttonHidden]: filtered === false,
                  [classes.marginBottom]:matches===true,
               })}
               type="submit"
               disabled={false}
            >
               {
                  fisefiltru?.length === 0 ? <p>Nici un rezultat</p> :
                     <p>Arată-mi <span>{fisefiltru.length}</span>{` fiș${fisefiltru.length === 1 ? 'ă' : 'e'}`}</p>
               }
            </Button>
            : null
         }
      </form>
   )
}

