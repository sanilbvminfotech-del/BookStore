import React from 'react';
import { Paper, Divider, Typography } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';

function PrivacyPolicy() {
    const policies = [
        {
            title: "Information Collection",
            content: "We collect information you provide directly to us when you create an account, such as your name, email address, password, and profile image. We also use cookies to maintain your session and improve security."
        },
        {
            title: "How We Use Data",
            content: "Your data is used to provide, maintain, and improve our services, including processing registrations, personalising your dashboard, and sending technical notices or security alerts."
        },
        {
            title: "Cookie Usage",
            content: "We use 'httpOnly' cookies for authentication (Refresh Tokens). These cookies are secure and cannot be accessed by client-side scripts, protecting you against Cross-Site Scripting (XSS) attacks."
        },
        {
            title: "Data Retention",
            content: "We store your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. You can request account deletion at any time via support."
        },
        {
            title: "Third-Party Sharing",
            content: "We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">


                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                        <ShieldIcon className="text-emerald-600 text-3xl" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                        Privacy <span className="text-emerald-600">Policy</span>
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium italic">
                        Last Updated: February 2024
                    </p>
                </div>

                <Paper elevation={0} className="p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm bg-white">
                    <div className="space-y-12">
                        {policies.map((policy, index) => (
                            <section key={index} className="relative pl-8 border-l-2 border-emerald-100 hover:border-emerald-500 transition-colors">
                                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                                    {policy.title}
                                </h2>
                                <Typography className="text-slate-600 leading-relaxed text-sm md:text-base">
                                    {policy.content}
                                </Typography>
                            </section>
                        ))}
                    </div>

                    <Divider className="my-12 border-slate-100" />

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                            Your Rights
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Under certain data protection laws, you have rights including the right to access,
                            rectify, or erase your personal data. To exercise these rights, please email our
                            Data Protection Officer at <span className="text-emerald-600 font-bold hover:underline cursor-pointer">privacy@yourlogo.com</span>.
                        </p>
                    </div>
                </Paper>

                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-xs">
                        &copy; 2024 Your Company Name. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
