import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  // Ye state batayegi ke API ko kya bhejna hai (Search text ya Category keyword)
  const [activeQuery, setActiveQuery] = useState('science'); 
  const [category, setCategory] = useState('science'); // Default category science

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(activeQuery)}&limit=40`);
        const data = await response.json();
        
        const formattedBooks = data.docs.map((book) => ({
          id: book.key.replace('/works/', ''),
          volumeInfo: {
            title: book.title,
            authors: book.author_name || ['Unknown Author'],
            categories: book.subject || ['General'],
            imageLinks: {
              thumbnail: book.cover_i 
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
                : 'https://via.placeholder.com/128x192?text=No+Image'
            },
            description: book.first_sentence ? book.first_sentence[0] : 'No description available for this book.'
          }
        }));
        
        setBooks(formattedBooks);
      } catch (err) {
        setError('Books load karne mein masla aa raha hai.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [activeQuery]); // Jab bhi activeQuery change hogi, naya data aayega

  // Jab user Search button dabaye
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      setActiveQuery(searchTerm);
      setCategory('all'); // Search karte waqt category reset kar do
    }
  };

  // Jab user Dropdown se Category select kare
  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    setCategory(selectedCat);
    
    // Category ke hisaab se API ko naya keyword bhejo
    if (selectedCat === 'science') setActiveQuery('science');
    else if (selectedCat === 'fiction') setActiveQuery('fiction');
    else if (selectedCat === 'history') setActiveQuery('history');
    else if (selectedCat === 'biography') setActiveQuery('biography');
    else if (selectedCat === 'all') setActiveQuery('books'); // Sab kuch dikhane ke liye
  };

 // ... (Upar ke imports aur logic same rahenge, sirf return ke andar ka code change karo)

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5 mb-2">Explore Your Next Read</h1>
        <p className="text-muted fs-5">Discover thousands of books from our library</p>
      </div>
      
      {/* Search & Filter Card */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0 rounded-4 p-3 bg-body-tertiary">
            <div className="row g-3">
              {/* Search Input */}
              <div className="col-md-7">
                <form onSubmit={handleSearch} className="d-flex gap-2">
                  <input 
                    type="text" 
                    className="form-control form-control-lg fs-6 rounded-3 border-0 shadow-sm" 
                    placeholder="🔍 Search books (e.g. Harry Potter)..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="btn btn-dark px-4 rounded-3 shadow-sm">Search</button>
                </form>
              </div>
              
              {/* Category Dropdown */}
              <div className="col-md-5">
                <select 
                  className="form-select form-select-lg fs-6 rounded-3 border-0 shadow-sm" 
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="all"> All Categories</option>
                  <option value="fiction">Fiction / Novels</option>
                  <option value="science"> Science / Tech</option>
                  <option value="history"> History</option>
                  <option value="biography"> Biography</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && <div className="text-center mt-5"><div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}></div></div>}
      
      {/* Error State */}
      {error && <h4 className="text-center mt-5 text-danger">{error}</h4>}

      {/* Books Grid */}
      {!loading && !error && (
        books.length === 0 ? (
          <div className="text-center mt-5 py-5">
            <h1 className="display-1 text-muted mb-3">📭</h1>
            <h4 className="text-muted">No books found.</h4>
            <p className="text-muted">Try changing your search keyword or category.</p>
          </div>
        ) : (
          <div className="row">
            {books.map((book) => (
              <div className="col-md-4 col-lg-3 mb-4" key={book.id}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Home;