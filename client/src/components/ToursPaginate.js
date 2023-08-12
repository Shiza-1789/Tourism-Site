import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import ReactPaginate from 'react-paginate'  
import { observer } from 'mobx-react-lite';

const ToursPaginate = observer(() => {
    const {tour} = useContext(Context)
    const pageCount = Math.ceil(tour.totalCount / tour.limit)

    const handlePageClick = (event) => {
        tour.setPage(event.selected + 1)
    };

    return (
        <ReactPaginate  
            forcePage={tour.page - 1}
            onPageChange={handlePageClick}
            DisplayedPageRange={3}  
            pageCount={pageCount}  
            renderOnZeroPageCount={null}  
            previousLabel="<"
            pageClassName="hover:bg-green-300"
            pageLinkClassName="border border-2 w-8 h-8 block"
            previousClassName="hover:bg-green-300"
            previousLinkClassName="border border-2 w-8 h-8 block"
            nextClassName="hover:bg-green-300"
            nextLinkClassName="border border-2 w-8 h-8 block"
            breakLabel="..."
            breakClassName="hover:bg-green-300"
            breakLinkClassName="border border-2 w-8 h-8 block"
            containerClassName="flex text-center"
            activeClassName="bg-green-600"
            nextLabel=">"  
        />  
    )
});

export default ToursPaginate;