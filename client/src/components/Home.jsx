import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const books = [
    { id: 1, title: "The Great Adventure", author: "John Carter", price: "$19.99", category: "Fiction", rating: 4.8, image: "TheGreatAdventure.jpg" },
    { id: 2, title: "Mystery of Time", author: "Emma Stone", price: "$14.99", category: "Mystery", rating: 4.5, image: "MysteryofTime.jpg" },
    { id: 3, title: "Learning React", author: "David Miller", price: "$29.99", category: "Technology", rating: 4.9, image: "LearningReact.jpg" },
    { id: 4, title: "Dream Big", author: "Sophia Lee", price: "$24.99", category: "Self-Help", rating: 4.7, image: "DreamBig.avif" },
    { id: 5, title: "Atomic Habits", author: "James Clear", price: "$18.50", category: "Self-Help", rating: 5.0, image: "AtomicHabits.jpg" },
    { id: 6, title: "The Silent Patient", author: "Alex Michaelides", price: "$12.00", category: "Thriller", rating: 4.6, image: "TheSilentPatient.jpg" },
    { id: 7, title: "Space Odyssey", author: "Arthur C. Clarke", price: "$21.99", category: "Science", rating: 4.8, image: "SpaceOdyssey.jpg" },
    { id: 8, title: "Culinary Arts", author: "Gordon Ramsay", price: "$35.00", category: "Cooking", rating: 4.9, image: "CulinaryArts.jpg" }
  ];

  const categories = [
    { name: "Fiction", icon: "📚", color: "bg-blue-50", text: "text-blue-700" },
    { name: "Science", icon: "🔬", color: "bg-purple-50", text: "text-purple-700" },
    { name: "Technology", icon: "💻", color: "bg-emerald-50", text: "text-emerald-700" },
    { name: "Biography", icon: "👤", color: "bg-orange-50", text: "text-orange-700" },
    { name: "Mystery", icon: "🕵️", color: "bg-rose-50", text: "text-rose-700" },
    { name: "Cooking", icon: "🍳", color: "bg-amber-50", text: "text-amber-700" },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">

      <section className="relative bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-800 text-white py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pattern-dots"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-widest uppercase bg-emerald-500/30 rounded-full border border-emerald-400/50 backdrop-blur-md">
            The #1 Online Bookstore
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
            Read Something <span className="text-emerald-300 italic">Extraordinary</span>
          </h1>
          <p className="text-xl mb-12 text-emerald-50 max-w-2xl mx-auto font-medium opacity-90">
            Curated collections from world-renowned authors. Delivered from our shelves to your heart.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button
              onClick={() => navigate("/bookshop")}
              className="bg-white text-emerald-700 px-10 py-4 rounded-2xl font-black shadow-2xl hover:bg-emerald-50 transition-all transform hover:-translate-y-1"
            >
              Browse Shop
            </button>
            <button className="border-2 border-emerald-400/50 text-white px-10 py-4 rounded-2xl font-black hover:bg-white/10 backdrop-blur-sm transition-all">
              Our Story
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">Featured Picks</h2>
              <p className="text-gray-500 font-medium italic">Handpicked by our editors this week</p>
            </div>
            <button onClick={() => navigate("/bookshop")} className="text-emerald-600 font-black flex items-center gap-2 hover:gap-4 transition-all uppercase text-sm tracking-wider">
              Explore All Books <span>&rarr;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {books.map((book) => (
              <div key={book.id} className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="relative h-72 overflow-hidden">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-[10px] font-black uppercase text-emerald-700 shadow-sm">
                    ⭐ {book.rating}
                  </div>
                </div>
                <div className="p-7">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2 block">{book.category}</span>
                  <h3 className="font-black text-gray-900 text-lg mb-1 leading-tight group-hover:text-emerald-600 transition-colors">{book.title}</h3>
                  <p className="text-sm text-gray-400 font-medium mb-6">by {book.author}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="text-2xl font-black text-gray-900">{book.price}</span>
                    <button className="bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all active:scale-90">
                      <svg xmlns="http://www.w3.org" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 100-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-16 underline decoration-emerald-200 underline-offset-8">Browse by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {categories.map((cat, idx) => (
              <div key={idx} className={`${cat.color} group p-10 rounded-[2.5rem] text-center cursor-pointer hover:shadow-xl hover:-translate-y-3 transition-all duration-300 border border-transparent hover:border-emerald-100`}>
                <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-300">{cat.icon}</div>
                <h3 className={`font-black uppercase text-xs tracking-widest ${cat.text}`}>{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-y border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { title: "Free Global Shipping", desc: "On all orders over $50", icon: "🌍" },
            { title: "Secure Checkout", desc: "SSL protected transactions", icon: "🛡️" },
            { title: "Daily Discounts", desc: "Up to 70% off daily deals", icon: "🏷️" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="text-5xl bg-white h-20 w-20 flex items-center justify-center rounded-3xl shadow-sm border border-gray-100">{item.icon}</div>
              <div>
                <h4 className="font-black text-gray-900 uppercase text-sm tracking-wider mb-1">{item.title}</h4>
                <p className="text-gray-500 font-medium text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-black text-gray-900 mb-8 leading-tight">What Our <span className="text-emerald-600 italic">Community</span> Says</h2>
              <p className="text-gray-500 font-medium text-lg mb-10">Don't just take our word for it. Join thousands of happy readers worldwide.</p>
              <div className="flex -space-x-4 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-14 w-14 rounded-full border-4 border-white bg-gray-200"></div>
                ))}
                <div className="h-14 w-14 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">+10k</div>
              </div>
            </div>
            <div className="bg-emerald-900 rounded-[3rem] p-12 text-white shadow-2xl relative">
              <div className="absolute -top-6 -left-6 bg-emerald-400 text-emerald-900 h-16 w-16 flex items-center justify-center text-4xl font-serif rounded-2xl shadow-xl">“</div>
              <p className="text-xl font-medium leading-relaxed mb-8 italic">
                "The selection is unparalleled. I found rare tech biographies here that were out of stock everywhere else. The packaging was eco-friendly too!"
              </p>
              <div>
                <p className="font-black uppercase tracking-widest text-emerald-400 text-sm">Alexander Pierce</p>
                <p className="text-xs text-emerald-200 opacity-60">Verified Reader since 2021</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-emerald-600 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10">Join the Book Club</h2>
          <p className="text-emerald-100 mb-12 max-w-xl mx-auto font-medium opacity-90 relative z-10">Get weekly reading lists, exclusive discounts, and invitations to virtual author meetups.</p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 relative z-10">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/20 border border-emerald-400/50 rounded-2xl px-6 py-4 text-white placeholder:text-emerald-100 outline-none focus:bg-white/30 transition-all"
            />
            <button className="bg-white text-emerald-700 px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}

export default Home;
