module.exports = {
    theme: {
        extend: {
            animation: {
                'status-pulse': 'status-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                'status-pulse': {
                    '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                    '50%': { transform: 'scale(1.25)', opacity: '0.7' }, 
                }
            }
        },
    },
    plugins: [],
}
