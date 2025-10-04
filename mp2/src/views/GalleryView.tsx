import React, { useContext, useMemo, useState } from 'react';
import { NasaContext } from '../context/NasaContext';
import formatDate from '../utils/formatDate';
import { Link } from 'react-router-dom';

const GalleryView: React.FC = () => {
    const ctx = useContext(NasaContext);
    const [year, setYear] = useState('');

    const years = useMemo(() => {
        const set = new Set<string>();
        const ctxItems = ctx ? ctx.items : [];
        ctxItems.forEach((it) => set.add(formatDate(it.data[0].date_created).slice(0, 4)));
        return Array.from(set).sort();
    }, [ctx]);

    const filtered = useMemo(() => {
        const ctxItems = ctx ? ctx.items : [];
        if (!year) return ctxItems;
        return ctxItems.filter((it) => formatDate(it.data[0].date_created).startsWith(year));
    }, [ctx, year]);

    return (
        <div>
            <h2>Gallery View</h2>
            <label>Filter by year: <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">All</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select></label>
            <div className="gallery-grid">
                {filtered.map((it) => (
                    <Link key={it.data[0].nasa_id} to={`/detail/${encodeURIComponent(it.data[0].nasa_id)}`} className="gallery-card">
                        <div>
                            {it.links && it.links[0] && <img src={it.links[0].href} alt={it.data[0].title} className="gallery-thumb" />}
                            <div>{it.data[0].title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GalleryView;
