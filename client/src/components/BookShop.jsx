import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { getAllBooksAdminAPI, searchItems, sortItems } from "../slices/bookSlice";
import { getCartDetailsAPI, incrementCartItemAPI, decrementCartItemAPI } from "../slices/cartSlice";
import { BookCard } from "./BookCard";

function BookShop() {
  const dispatch = useDispatch();
  const [processingId, setProcessingId] = useState(null);

  const { books, isLoading, search, sort } = useSelector((state) => state.book);
  const cartItems = useSelector((state) => state.cart?.cart?.items || []);

  useEffect(() => {
    dispatch(getAllBooksAdminAPI());
    const token = sessionStorage.getItem("accessToken");
    if (token) dispatch(getCartDetailsAPI());
  }, [dispatch]);



  const handleCartAction = useCallback(async (e, bookId, action) => {
    e.preventDefault();
    e.stopPropagation();
    setProcessingId(bookId);
    try {
      action === "increment" ? await dispatch(incrementCartItemAPI({ id: bookId })) : await dispatch(decrementCartItemAPI(bookId));
    } finally {
      setProcessingId(null);
    }
  }, [dispatch]);




  const filteredAndSortedBooks = useMemo(() => {
    if (!books) return []

    let result = books.filter(book => book.title?.trim().toLowerCase().includes(search.trim().toLowerCase()) || book.author?.trim().toLowerCase().includes(search.trim().toLowerCase()))

    if (sort === 'lowtohigh') {
      result.sort((a, b) => a.price - b.price)
    } else if (sort === 'hightolow') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [books, search, sort])


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Explore Our <span className="text-emerald-600">Library</span>
        </h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={sort}
            onChange={(e) => dispatch(sortItems(e.target.value))}
            className="border border-gray-300 p-2.5 rounded-lg bg-white focus:ring-emerald-500">
            <option value="default">Sort by price</option>
            <option value="lowtohigh">Price: Low to High</option>
            <option value="hightolow">Price: High to Low</option>
          </select>

          <div className="relative w-full md:w-72">
            <input
              value={search}
              onChange={(e) => dispatch(searchItems(e.target.value))}
              type="text"
              placeholder="Search titles or authors..."
              className="w-full border border-gray-300 p-2.5 pl-4 rounded-lg shadow-sm focus:ring-emerald-500 bg-white"/>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredAndSortedBooks.length > 0 ? (
          filteredAndSortedBooks.map((book) => {
            const itemInCart = cartItems.find((item) => item.book?._id === book._id);
            return (
              <BookCard
                key={book._id}
                book={book}
                quantity={itemInCart?.quantity || 0}
                isThisCardLoading={processingId === book._id}
                handleCartAction={handleCartAction}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500 text-xl font-medium">No results found for "{search}"</p>
            <button onClick={() => dispatch(searchItems(''))} className="mt-4 text-emerald-600 underline">
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookShop;
