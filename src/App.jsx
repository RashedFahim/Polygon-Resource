import { Navigate, Route, Routes } from 'react-router-dom';
import RouteScrollReset from './components/routing/RouteScrollReset';
import { PRODUCT_DATA } from './data/products';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { getProductPath } from './utils/productPaths';

function App() {
  return (
    <>
      <RouteScrollReset />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {PRODUCT_DATA.map((product) => (
          <Route
            key={product.name}
            path={getProductPath(product.name)}
            element={<ProductPage product={product} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
