import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;
  const { addFavorite, removeFavorite, favorites } = useContext(FavoriteContext);

  if (!book) return <h2 className="text-center mt-5">Book Not Found</h2>;

  const isFavorite = favorites.find(fav => fav.id === book.id);
  const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image';

  return (
    <div className="container mt-4 mb-5">
      <button className="btn btn-link text-decoration-none text-secondary px-0 mb-3" onClick={() => navigate(-1)}>← Back</button>
      <div className="row bg-white dark:bg-dark p-4 rounded-4 shadow-sm">
        <div className="col-md-4 text-center mb-4">
          <img src={thumbnail} alt={book.volumeInfo.title} className="img-fluid shadow-lg rounded" style={{ maxHeight: '350px' }} />
        </div>
        <div className="col-md-8">
          <h2 className="fw-bold">{book.volumeInfo.title}</h2>
          <h5 className="text-muted mb-3">By {book.volumeInfo.authors?.join(', ') || 'Unknown'}</h5>
          <p className="badge bg-secondary mb-3">{book.volumeInfo.categories?.[0] || 'General'}</p>
          <p style={{ lineHeight: '1.8' }}>{book.volumeInfo.description}</p>
          
          <button 
            onClick={() => isFavorite ? removeFavorite(book.id) : addFavorite(book)} 
            className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'} px-4 py-2 mt-3`}
          >
            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;