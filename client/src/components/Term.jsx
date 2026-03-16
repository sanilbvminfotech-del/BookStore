import React from 'react';
import { Paper, Divider } from '@mui/material';

function Term() {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using this platform, you accept and agree to be bound by the terms and provision of this agreement. Any participation in this service will constitute acceptance of this agreement."
        },
        {
            title: "2. User Accounts",
            content: "To access certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account."
        },
        {
            title: "3. Privacy Policy",
            content: "Your use of the platform is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices."
        },
        {
            title: "4. Intellectual Property",
            content: "All content included as part of the Service, such as text, graphics, logos, and images, is the property of the Company or its suppliers and protected by copyright and other laws."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Terms of Service</h1>
                    <p className="text-slate-500 mt-3 font-medium">Last updated: February 2026</p>
                </div>

                <Paper elevation={0} className="p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm bg-white">
                    <div className="space-y-10">
                        {sections.map((section, index) => (
                            <div key={index} className="group">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors">
                                    {section.title}
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    {section.content}
                                </p>
                                {index !== sections.length - 1 && (
                                    <Divider className="mt-8 border-slate-100" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-6 bg-slate-50 rounded-xl border border-slate-100 text-center">
                        <p className="text-sm text-slate-500 font-semibold uppercase tracking-widest mb-2">
                            Questions?
                        </p>
                        <p className="text-slate-600">
                            If you have any questions about these Terms, please contact us at{' '}
                            <span className="text-emerald-600 font-bold cursor-pointer hover:underline">
                                support@yourlogo.com
                            </span>
                        </p>
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export default Term;
