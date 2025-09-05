import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './layout/home/home';
import { Products } from './layout/products/products';
import { Login } from './layout/Authentication/login/login';
import { Cart } from './layout/cart/cart';
import { Details } from './layout/products/product-details/details/details';
import { CheckOut } from './layout/Order/check-out/check-out';
import { Thanks } from './layout/Order/thanks/thanks';
import { MyOrders } from './layout/Order/my-orders/my-orders';
import { OrderDetails } from './layout/Order/my-orders/order-details/order-details';
import { adminGuard } from './core/guards/admin-guard';
import { authGuard } from './core/guards/auth-guard';
import { FAQs } from './layout/faqs/faqs';
import { Testimonials } from './layout/testimonials/testimonials';

export const routes: Routes = [
  {path:'',component:Layout,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    {path:'products',component:Products},
    {path:'login',component:Login},
    {path:'faqs',component:FAQs},
    {path: 'testimonials',component: Testimonials},
    {
    path: 'signup',
    loadComponent: () => import('./layout/Authentication/singup/singup')
      .then(m => m.Singup)
    },
    {path:'cart',component:Cart, canActivate:[authGuard]},
    {path:'products/:slug',component:Details},
    {path:'checkout',component:CheckOut,canActivate:[authGuard]},
    {path:'thanks',component:Thanks},
    {path:'my-orders',component:MyOrders,canActivate:[authGuard]},
    {path:'order-details/:id',component:OrderDetails, canActivate:[authGuard]},
  ]},

  {path:'dashboard' , canMatch:[adminGuard],loadComponent:()=> import('./dashboard/dashboard').then(d=> d.Dashboard),
      children: [
        {path:'',redirectTo:'products',pathMatch:'full'},
        {
          path: 'products',
          loadComponent: () => import('./dashboard/products/products').then(m => m.Products),
        },

        {
          path: 'products/create',
          loadComponent: () => import('./dashboard/products/create-product/create-product').then(m => m.CreateProduct)},
        {
          path: 'products/edit/:slug',
          loadComponent: () => import('./dashboard/products/edit-product/edit-product').then(m => m.EditProduct)},
        {
          path: 'categories',
          loadComponent: () => import('./dashboard/categories/categories').then(m => m.Categories)
        },
        {
          path: 'categories/create',
          loadComponent: () => import('./dashboard/categories/add-category/add-category').then(m => m.AddCategory)
        },
        {
          path: 'categories/edit/:slug',
          loadComponent: () => import('./dashboard/categories/edit-category/edit-category').then(m => m.EditCategory)
        },
        {
          path: 'orders',
          loadComponent: () => import('./dashboard/orders/orders').then(m => m.Orders)
        },
        {
          path: 'reports',
          loadComponent: () => import('./dashboard/reports/reports').then(m => m.Reports)
        },
        {
          path: 'faq',
          loadComponent: () => import('./dashboard/faq/faq').then(m => m.Faq)
        },
        {
          path: 'faq/create',
          loadComponent: () => import('./dashboard/faq/add-faq/add-faq').then(m => m.AddFaq)
        },
        {
          path: 'faq/edit/:id',
          loadComponent: () => import('./dashboard/faq/edit-faq/edit-faq').then(m => m.EditFaq)
        },
        {
          path: 'testimonials',
          loadComponent: () => import('./dashboard/testimonials/testimonials').then(m => m.Testimonials)
        }
    ]
  }
];
