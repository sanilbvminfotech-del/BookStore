import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
    const navigate = useNavigate();

    return (
        <div className="bg-white">
            <section className="relative bg-emerald-600 py-20 px-6 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                        Our Story
                    </h1>
                    <p className="text-lg md:text-xl text-emerald-50 font-medium">
                        Building a community where books and technology meet.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Our Mission
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Founded in 2024, our platform started with a simple idea: making it easier for readers to connect with the books they love while providing a seamless digital experience.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        We believe that every reader deserves a personalized journey. From our curated shop to our interactive user dashboards, everything we build is centered around you.
                    </p>
                    <div className="mt-8">
                        <Button
                            variant="contained"
                            className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-lg font-bold shadow-lg"
                            onClick={() => navigate('/bookshop')}
                        >
                            Explore Shop
                        </Button>
                    </div>
                </div>

                <div className="bg-slate-100 rounded-2xl h-80 flex items-center justify-center border-2 border-dashed border-slate-300">
                    <span className="text-slate-400 font-bold italic text-2xl uppercase tracking-widest">
                        Our Workspace
                    </span>
                </div>
            </section>

            <section className="bg-slate-50 py-16 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <p className="text-3xl font-black text-emerald-600">10k+</p>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Users</p>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-emerald-600">500+</p>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Books</p>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-emerald-600">24/7</p>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Support</p>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-emerald-600">100%</p>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Secure</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;
