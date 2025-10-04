import React, { useContext, useMemo, useState } from 'react';
import { NasaContext } from '../context/NasaContext';
import { useNavigate } from 'react-router-dom';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';

const ListView: React.FC = () => {
    const ctx = useContext(NasaContext);
    const navigate = useNavigate();
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<any[]>([]);

    const data = useMemo(() => (ctx ? ctx.items.map((it: any) => ({
        id: it.data[0].nasa_id,
        title: it.data[0].title,
        date: it.data[0].date_created,
        description: it.data[0].description || ''
    })) : []), [ctx]);

    const columns = useMemo(() => [
        {
            accessorKey: 'title',
            header: 'Title',
        },
        {
            accessorKey: 'date',
            header: 'Date',
        },
        {
            accessorKey: 'description',
            header: 'Description',
        }
    ], []);

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter, sorting },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: 'includesString'
    });

    const onRowClick = (row: any) => {
        if (row && row.original && row.original.id) navigate(`/detail/${encodeURIComponent(row.original.id)}`);
    };

    return (
        <div>
            <h2>List View</h2>
            <div className="list-controls">
                <input className="quick-filter" placeholder="Quick filter..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
            </div>

            <div className="list-table-wrapper">
                <table className="table" style={{ width: '100%' }}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup: any) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header: any) => {
                                    const key = header.column.columnDef?.accessorKey || header.id;
                                    return (
                                        <th key={header.id} className={`col-${key}`} onClick={header.column.getToggleSortingHandler()} style={{ cursor: 'pointer' }}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <span>{header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}</span>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row: any) => (
                            <tr key={row.id} className="table-row" onClick={() => onRowClick(row)}>
                                {row.getVisibleCells().map((cell: any) => {
                                    const key = cell.column.columnDef?.accessorKey || cell.id;
                                    const content = flexRender(cell.column.columnDef.cell, cell.getContext());
                                    // make description cells multi-line clamped
                                    const extraClass = key === 'description' ? 'cell-truncate multiline' : 'cell-truncate';
                                    return (
                                        <td key={cell.id} className={`col-${key}`} title={typeof content === 'string' ? content : ''}>
                                            <div className={extraClass}>{content}</div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                <button className="btn" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Prev</button>
                <button className="btn" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
                <div style={{ marginLeft: 'auto' }}>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
            </div>
        </div>
    );
};

export default ListView;

// export default ListView;
// import React, { useContext, useMemo, useState } from 'react';
// import { NasaContext } from '../context/NasaContext';
// import { Link } from 'react-router-dom';

// const ListView: React.FC = () => {
//     const ctx = useContext(NasaContext);
//     const [query, setQuery] = useState('');
//     const [sortBy, setSortBy] = useState<'title' | 'date'>('title');
//     const [dir, setDir] = useState<'asc' | 'desc'>('asc');

//     const filtered = useMemo(() => {
//         const q = query.toLowerCase();
//         const ctxItems = ctx ? ctx.items : [];
//         let arr = ctxItems.slice();
//         if (q) {
//             arr = arr.filter((it) => it.data[0].title.toLowerCase().includes(q));
//         }
//         arr.sort((a, b) => {
//             const ad = sortBy === 'title' ? a.data[0].title : a.data[0].date_created;
//             const bd = sortBy === 'title' ? b.data[0].title : b.data[0].date_created;
//             if (ad < bd) return dir === 'asc' ? -1 : 1;
//             if (ad > bd) return dir === 'asc' ? 1 : -1;
//             return 0;
//         });
//         return arr;
//     }, [ctx, query, sortBy, dir]);

//     if (!ctx) return <div>Loading (search first)</div>;


//     return (
//         <div>
//             <h2>List View</h2>
//             <div className="list-controls">
//                 <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter as you type" />
//                 <label>
//                     Sort:
//                     <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
//                         <option value="title">Title</option>
//                         <option value="date">Date</option>
//                     </select>
//                 </label>
//                 <label>
//                     Direction:
//                     <select value={dir} onChange={(e) => setDir(e.target.value as any)}>
//                         <option value="asc">Ascending</option>
//                         <option value="desc">Descending</option>
//                     </select>
//                 </label>
//             </div>
//             <ul>
//                 {filtered.map((it) => (
//                     <li key={it.data[0].nasa_id}>
//                         <Link to={`/detail/${encodeURIComponent(it.data[0].nasa_id)}`}>{it.data[0].title}</Link>
//                         <div>{it.data[0].date_created}</div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ListView;
