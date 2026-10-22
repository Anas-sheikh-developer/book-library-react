import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image';

  return (
    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
      
      {/* Image Box */}
      <div className="bg-light d-flex justify-content-center align-items-center" style={{ height: '250px', padding: '20px' }}>
        <img 
          src={thumbnail} 
          alt={book.volumeInfo.title} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
        />
      </div>
      
      <div className="card-body d-flex flex-column p-4">
        <h6 className="card-title fw-bold mb-2 text-truncate" title={book.volumeInfo.title}>
          {book.volumeInfo.title}
        </h6>
        
        <p className="text-muted small mb-4 text-truncate">
          {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
        </p>
        
        {/* Button Section */}
        <div className="mt-auto pt-3 border-top border-secondary border-opacity-25">
          <Link 
            to={`/book/${book.id}`} 
            state={{ book }} 
            className="btn btn-light border w-100 py-2 fw-bold text-dark shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;