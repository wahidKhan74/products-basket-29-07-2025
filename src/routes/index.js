export const routes = [
    { 
        path: '/', 
        label: 'Home', 
        icon: 'fas fa-home', 
        isPrivate: false,
        showInNav: true
    },
    {
        path: '/products',
        label: 'Products',
        icon: 'fas fa-boxes',
        isPrivate: true,
        showInNav: true
    },
    {
        path: '/add-product',
        label: 'Add Product',
        icon: 'fas fa-plus',
        isPrivate: true,
        showInNav: false
    },
    {
        path: '/cart',
        label: 'Cart',
        icon: 'fas fa-plus',
        isPrivate: true,
        showInNav: false
    },
    {
        path: '/edit-product/:id',
        label: 'Update Product',
        icon: 'fas fa-edit',
        isPrivate: true,
        showInNav: false
    },
    {
        path: '/profile',
        label: 'Profile',
        icon: 'fas fa-user-circle',
        isPrivate: true,
        showInNav: true
    },
    {
        path: '/login',
        label: 'Login',
        icon: 'fas fa-sign-in-alt',
        isPrivate: false,
        showInNav: true,
        guestOnly: true, // will not show when logged in
    },
    {
        path: '/register',
        label: 'Register',
        icon: 'fas fa-user-plus',
        isPrivate: false,
        guestOnly: true,
        showInNav: true
    }
];