import 'uno.css';
import { render } from 'solid-js/web';

import './default.css';

import App from './App';

render(() => <App />, document.querySelector('#root') as HTMLElement);
