import { MovieProvider } from "@/context/movie";
import { OrderProvider } from "@/context/order";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <OrderProvider>
            <MovieProvider>
                <Component {...pageProps} />
            </MovieProvider>
        </OrderProvider>
    );
}
