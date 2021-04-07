import React, { useContext } from 'react';
import { FirebaseContext } from '../Firebase'
import { ErrorBoundary } from 'react-error-boundary'
import RenderThemes from '../RenderThemes'
import Filterteme from '../Filterteme'
import Search from '../Search'
import ErrorFallback from '../utils/ErrorFallback'
import { useThemesFilter } from '../../utils/hooks/useFilter'
import { useSearchFilter } from '../../utils/hooks/useSearch'
import { createSearchEntry, createFilterEntry } from '../../utils/createsearch'

const TemeLayout = ({ latestTeme }) => {

    const { user } = useContext(FirebaseContext)
    const userId = user?.profile.id;

    const [filterquery, setFilterquery] = React.useState({})
    const [filtered, setFiltered] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')
    const [searched, setSearched] = React.useState(false)

    const temefiltru = useThemesFilter(latestTeme, filterquery)

    const temesearch = useSearchFilter(searchTerm, latestTeme)
    // console.log('filterquery', filterquery, filtered)

    React.useEffect(() => {
        if (filtered) {
            setSearched(false)
            setSearchTerm('')
            document.getElementById('search').value = ''
        }
    }, [filtered])

    const handleSearchClick = (e) => {
        e.preventDefault()
        if (!e.target.elements.search.value) {
            setSearched(false)
            setSearchTerm('')
            setFiltered(false)
            setFilterquery({})
        } else {
            setFiltered(false)
            setFilterquery({ query: {} })
            setSearched(true)
            setSearchTerm(e.target.elements.search.value)
            createSearchEntry({ query: `teme: ${searchTerm}` })
        }
    }
    const handleFetchClick = (e) => {
        e.preventDefault()
        setSearched(false)
        // setFiltered(true)
        createFilterEntry({ query: filterquery })
    }
    const max_number_of_teme_in_render = 6


    return (
        <>

            <Search
                setSearched={setSearched}
                setSearchTerm={setSearchTerm}
                handleSearchClick={handleSearchClick}
                placeholder={'Cauta teme...'}
            />
            <Filterteme
                handleFetchClick={handleFetchClick}
                temefiltru={temefiltru}
                filtered={filtered}
                setFilterquery={setFilterquery}
                setFiltered={setFiltered}
                filterquery={filterquery}
            />
            {
                ((!searched && !filtered)) ?
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <RenderThemes temeDinQuery={latestTeme}
                            userId={userId}
                            max={max_number_of_teme_in_render}
                            title={'Ultimele teme adăugate'}
                        />
                    </ErrorBoundary>
                    : (filtered) ?
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <RenderThemes
                                temeDinQuery={temefiltru}
                                userId={userId}
                                title={'Rezultatul selectiei'} />
                        </ErrorBoundary>
                        : (searched) ?
                            <ErrorBoundary FallbackComponent={ErrorFallback}>
                                <RenderThemes
                                    temeDinQuery={temesearch}
                                    userId={userId}
                                    title={'Rezultatul căutării:'} />
                            </ErrorBoundary> : (null)
            }
        </>
    )
}
export default TemeLayout;