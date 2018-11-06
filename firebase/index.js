import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { config } from './config';

export const app = firebase.initializeApp(config);
