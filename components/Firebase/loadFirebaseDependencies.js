const app = import('firebase/app');
const auth = import('firebase/auth');

const loadFirebaseDependencies = Promise.all([app, auth]).then(values => {
  return values[0];
});

export default loadFirebaseDependencies;