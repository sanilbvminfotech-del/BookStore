import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FAQPage() {
    const faqs = [
        {
            question: "How do I create an account?",
            answer: "Click the 'Register' button in the header. Fill in your personal details, upload a profile photo, and you'll be ready to go!"
        },
        {
            question: "Is my personal data secure?",
            answer: "Yes, we use industry-standard encryption and secure cookies (httpOnly) to protect your sensitive information and session data."
        },
        {
            question: "How can I reset my password?",
            answer: "Go to the Login page and click 'Forgot Password'. Enter your registered email, and we will send you a secure reset link."
        },
        {
            question: "What should I do if I can't log in?",
            answer: "Ensure your credentials are correct. If the problem persists, your session might have expired. Try clearing your browser cache or contacting support."
        },
        {
            question: "Can I update my profile information?",
            answer: "Absolutely! Once logged in, navigate to your Profile page where you can view and edit your personal details and hobbies."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                        Frequently Asked <span className="text-emerald-600">Questions</span>
                    </h1>
                    <p className="text-slate-500 mt-4 text-lg">
                        Everything you need to know about our platform.
                    </p>
                </div>

   
                <Paper elevation={0} className="bg-transparent">
                    {faqs.map((faq, index) => (
                        <Accordion 
                            key={index} 
                            className="mb-3 rounded-xl border border-slate-200 before:hidden shadow-sm overflow-hidden"
                            sx={{ '&:before': { display: 'none' } }} 
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className="text-emerald-600" />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                                className="hover:bg-slate-50 transition-colors py-2"
                            >
                                <Typography className="font-bold text-gray-800">
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="bg-white border-t border-slate-100">
                                <Typography className="text-slate-600 leading-relaxed">
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Paper>

                <div className="mt-12 text-center bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">Still have questions?</h3>
                    <p className="text-emerald-700 mb-6">
                        If you cannot find the answer you are looking for, our team is here to help.
                    </p>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FAQPage;
