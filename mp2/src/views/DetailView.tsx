import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NasaContext } from '../context/NasaContext';
import formatDate from '../utils/formatDate';

const DetailView: React.FC = () => {
  const { id } = useParams();
  const ctx = useContext(NasaContext);
  const nav = useNavigate();
  if (!ctx) return null;
  const { items } = ctx;
  const idx = items.findIndex((it) => it.data[0].nasa_id === id);
  if (idx === -1) return <div>Not found</div>;
  const item = items[idx];

  return (
    <div>
      <div className="detail-controls">
        <button className="btn btn-minimal" onClick={() => nav(-1)}>Back</button>
      </div>
      <h2>{item.data[0].title}</h2>
      <div>{formatDate(item.data[0].date_created)}</div>
      <div>{item.data[0].description}</div>
      {item.links && item.links[0] && <img src={item.links[0].href} alt={item.data[0].title} className="detail-img" />}
      <div className="detail-controls">
        <button className="btn" disabled={idx === 0} onClick={() => nav(`/detail/${items[idx - 1].data[0].nasa_id}`)}>Previous</button>
        <button className="btn" disabled={idx === items.length - 1} onClick={() => nav(`/detail/${items[idx + 1].data[0].nasa_id}`)}>Next</button>
      </div>
    </div>
  );
};

export default DetailView;
