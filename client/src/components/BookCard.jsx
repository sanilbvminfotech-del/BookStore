import React from 'react';
import { Link } from 'react-router-dom';

export const BookCard = React.memo(({ book, quantity, isThisCardLoading, handleCartAction }) => {


    return (
        <Link key={book._id} to={`/book-detail/${book._id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-64 bg-gray-100 flex items-center justify-center p-4">
                <img src={`http://localhost:8000/image/bookImage/${book.bookImage}`} alt={book.title} className="h-full object-contain" />
            </div>
            <div className="p-5">
                <h3 className="font-bold text-gray-900 truncate">{book.title}</h3>
                <p className="text-sm text-gray-500 mb-4 italic">{book.author}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-emerald-600">₹{book.price}</span>
                    <small className="text-xs">{book.stock}</small>
                    {quantity > 0 ? (
                        <div className="flex items-center bg-emerald-50 rounded-lg border border-emerald-200">
                            <button disabled={isThisCardLoading} onClick={(e) => handleCartAction(e, book._id, 'decrement')} className="px-3 py-1 text-emerald-700 font-bold hover:bg-emerald-100 disabled:opacity-50">-</button>
                            <span className="px-2 font-bold text-emerald-900 min-w-5 text-center">{isThisCardLoading ? '..' : quantity}</span>
                            <button disabled={isThisCardLoading} onClick={(e) => handleCartAction(e, book._id, 'increment')} className="px-3 py-1 text-emerald-700 font-bold hover:bg-emerald-100 disabled:opacity-50">+</button>
                        </div>
                    ) : (
                        <button type='button' disabled={isThisCardLoading} onClick={(e) => handleCartAction(e, book._id, 'increment')} className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                            {isThisCardLoading ? 'Adding...' : 'Add Now'}
                        </button>
                    )}
                </div>
            </div>
        </Link>
    );
});
