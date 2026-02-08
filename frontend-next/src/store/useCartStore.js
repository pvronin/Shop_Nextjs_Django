import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],

            // افزودن به سبد
            addToCart: (product) => {
                const cart = get().cart;
                const existingItem = cart.find((item) => item.id === product.id);

                if (existingItem) {
                    // اگر محصول بود، فقط تعداد را زیاد کن
                    set({
                        cart: cart.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    });
                } else {
                    // اگر محصول جدید بود، با تعداد ۱ اضافه کن
                    set({ cart: [...cart, { ...product, quantity: 1 }] });
                }
            },

            // این را داخل استور اضافه کن:
            decreaseQuantity: (productId) => {
                const cart = get().cart;
                const existingItem = cart.find(item => item.id === productId);

                if (existingItem.quantity > 1) {
                    set({
                        cart: cart.map(item =>
                            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                        )
                    });
                } else {
                    // اگر تعداد ۱ بود و منفی زد، کلا حذفش کن
                    set({ cart: cart.filter(item => item.id !== productId) });
                }
            },

            // حذف از سبد
            removeFromCart: (productId) =>
                set({ cart: get().cart.filter((item) => item.id !== productId) }),

            // خالی کردن کامل سبد
            clearCart: () => set({ cart: [] }),

            // محاسبه قیمت کل
            getTotalPrice: () =>
                get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
        }),
        {
            name: 'shopping-cart', // نام کلید در LocalStorage
        }
    )
);
    