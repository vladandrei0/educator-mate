import React, { useContext } from 'react'
import { FirebaseContext } from '../Firebase'
import Search from '../Search'
import { FilterForm } from '../Filterform'
import { createSearchEntry, createFilterEntry } from '../../utils/createsearch'
import RenderSheets from '../RenderSheets'
import { ErrorBoundary } from 'react-error-boundary'
import { tipItems } from '../../public/lib/utils/filteritems'
import { useFilter } from '../../utils/hooks/useFilter'
import { useSearch } from '../../utils/hooks/useSearch'
import ErrorFallback from '../utils/ErrorFallback'
import { useRouter } from 'next/router'

// const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

const FiseLayout = (props) => {
    const { latest: fisedinprops } = props
    // console.log(fisedinprops)
    const { user } = useContext(FirebaseContext)
    const userId = user?.profile.id;

    const [filterquery, setFilterquery] = React.useState({})
    const [filtered, setFiltered] = React.useState(false)

    const [searched, setSearched] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')

    const [visible, setVisible] = React.useState(6)
    const router = useRouter()

    const { query } = router
    const arrayfromquery = Object.entries(router.query)
    // console.log('array', query)

    const handleDelete = (e, itemToDelete, tip) => {
        e.preventDefault()
        let removed = { ...query }
        if (itemToDelete === 'domeniu') {
            removed = {}
        } else if (itemToDelete === 'tip' && Array.isArray(removed['tip'])) {
            let newtip = removed['tip'].filter(item => item !== tip)
            removed['tip'] = newtip
            removed.page = 6

        } else {
            delete removed[itemToDelete]
            removed.page = 6

        }
        router.push({
            pathname: '/fise',
            query: removed
        }, undefined, { shallow: true })
    }

    const changeRoute = (e) => {
        e.preventDefault()
        router.push({
            pathname: '/fise',
            query: { ...filterquery, page: 6 }
        }, undefined, { shallow: true })
    }
    const changeSearchRoute = (e) => {
        e.preventDefault()
        router.push({
            pathname: '/fise',
            query: { search: searchTerm, page: 6 }
        }, undefined, { shallow: true })
    }
    const fisefiltru = useFilter(fisedinprops, filterquery, tipItems, filtered)

    const searchedFise = useSearch(query.search, fisedinprops)

    // is used only to show how many results the filter may show
    let filtruquery = useFilter(fisedinprops, router.query, tipItems, filtered)


    // console.log('filtered', filtered)

    const handleSearchClick = (e) => {
        e.preventDefault()
        if (!e.target.elements.search.value) {
            setSearched(false)
            setSearchTerm('')
            setFiltered(false)
            setFilterquery({})
            setVisible(6)
        } else {
            setFiltered(false)
            setFilterquery({})
            setSearched(true)
            setVisible(6)
            // setSearchTerm(e.target.elements.search.value)
            changeSearchRoute(e)
            createSearchEntry({ query: searchTerm })
        }
    }
    const handleFilterClick = (e) => {
        e.preventDefault()
        // clear search
        document.getElementById('search').value = ''
        changeRoute(e)
        setSearched(false)
        setSearchTerm('')
        setFiltered(false)
        createFilterEntry({ query: filterquery })
        setFilterquery({})
        setVisible(6)
    }

    const max_number_of_fise_in_render = 6

    const loadMore = () => {

        router.push({
            pathname: '/fise',
            query: { ...query, page: visible }
        }, undefined, { shallow: true })
    }

    React.useEffect(() => {
        if (!!query.domeniu) {
            setVisible(Number(query.page) + 6)
        }
        if (!!query.search) {
            setVisible(Number(query.page) + 6)
        }
        if (!query.domeniu && !query.search) {
            setVisible(6)
        }

    }, [query])

    // console.log('fisefiltru', fisefiltru)
    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Search
                    setSearched={setSearched}
                    setSearchTerm={setSearchTerm}
                    handleSearchClick={handleSearchClick}
                    placeholder={'Cauta fise...'}
                />
            </div>
            <FilterForm
                handleFilterClick={handleFilterClick}
                fisefiltru={fisefiltru}
                filtered={filtered}
                setFilterquery={setFilterquery}
                setFiltered={setFiltered}
                filterquery={filterquery}

            />

            {
                ((!searched && !filtruquery.length)) ?
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <RenderSheets fiseDinQuery={fisedinprops}
                            userId={userId}
                            title={'Ultimele fișe adăugate'}
                            max={max_number_of_fise_in_render}
                            arrayfromquery={[]}
                            handleDelete={handleDelete}
                            visible={query.page || visible}
                            loadMore={loadMore}
                        />
                    </ErrorBoundary>
                    : (searched) ?
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <RenderSheets
                                fiseDinQuery={searchedFise}
                                userId={userId}
                                title={'Rezultatul căutării:'}
                                arrayfromquery={arrayfromquery}
                                handleDelete={handleDelete}
                                visible={query.page || visible}
                                loadMore={loadMore} />
                        </ErrorBoundary>
                        : (router.query) ?
                            <ErrorBoundary FallbackComponent={ErrorFallback}>
                                <RenderSheets
                                    fiseDinQuery={filtruquery}
                                    userId={userId}
                                    title={'Rezultatul selectiei pentru:'}
                                    arrayfromquery={arrayfromquery}
                                    handleDelete={handleDelete}
                                    visible={query.page || visible}
                                    loadMore={loadMore} />
                            </ErrorBoundary>
                            : (null)
            }
        </>
    )
}

export default FiseLayout;


