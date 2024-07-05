import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

export const setupProdMockServer = () => {
  createProdMockServer([]);
}
