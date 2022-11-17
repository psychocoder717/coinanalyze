import { render, cleanup,expect } from '@testing-library/jest-dom';

import App from './App';
afterEach(cleanup)


it("should take a snapshot",()=>{
  const {asFragment}=render(<App/>);
expect(asFragment(<App/>)).toMatchSnapshots();
});