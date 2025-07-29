export const routes = [
    { 
        path: '/', 
        label: 'Home', 
        icon: 'fas fa-home', 
        isPrivate: false 
    },
    {
        path: '/products',
        label: 'Products',
        icon: 'fas fa-boxes',
        isPrivate: true,
    },
    {
        path: '/add-product',
        label: 'Add Product',
        icon: 'fas fa-plus',
        isPrivate: true,
    },
    {
        path: '/profile',
        label: 'Profile',
        icon: 'fas fa-user-circle',
        isPrivate: true,
    },
    {
        path: '/login',
        label: 'Login',
        icon: 'fas fa-sign-in-alt',
        isPrivate: false,
        guestOnly: true, // will not show when logged in
    },
    {
        path: '/register',
        label: 'Register',
        icon: 'fas fa-user-plus',
        isPrivate: false,
        guestOnly: true,
    }
];