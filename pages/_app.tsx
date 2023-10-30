import '../styles/globals.css'
import { AppProps } from 'next/app';
import { wrapper } from '../reducer/store';
import { Provider } from 'react-redux';

function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest)
    return (
        <Provider store={store}>
            <Component {...props.pageProps} />
        </Provider>
    );
}

export default App;