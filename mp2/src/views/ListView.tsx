import React, { useContext, useMemo, useState } from 'react';
import { NasaContext } from '../context/NasaContext';
import { Link } from 'react-router-dom';

const ListView: React.FC = () => {
    const ctx = useContext(NasaContext);
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState<'title' | 'date'>('title');
    const [dir, setDir] = useState<'asc' | 'desc'>('asc');

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        const ctxItems = ctx ? ctx.items : [];
        let arr = ctxItems.slice();
        if (q) {
            arr = arr.filter((it) => it.data[0].title.toLowerCase().includes(q));
        }
        arr.sort((a, b) => {
            const ad = sortBy === 'title' ? a.data[0].title : a.data[0].date_created;
            const bd = sortBy === 'title' ? b.data[0].title : b.data[0].date_created;
            if (ad < bd) return dir === 'asc' ? -1 : 1;
            if (ad > bd) return dir === 'asc' ? 1 : -1;
            return 0;
        });
        return arr;
    }, [ctx, query, sortBy, dir]);

    if (!ctx) return <div>Loading (search first)</div>;

    const { items } = ctx;

    return (
        <div>
            <h2>List View</h2>
            <div className="list-controls">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter as you type" />
                <label>
                    Sort:
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
                        <option value="title">Title</option>
                        <option value="date">Date</option>
                    </select>
                </label>
                <label>
                    Direction:
                    <select value={dir} onChange={(e) => setDir(e.target.value as any)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>
            <ul>
                {filtered.map((it) => (
                    <li key={it.data[0].nasa_id}>
                        <Link to={`/detail/${encodeURIComponent(it.data[0].nasa_id)}`}>{it.data[0].title}</Link>
                        <div>{it.data[0].date_created}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListView;
