import { Navigate, Route, Routes } from 'react-router-dom';
import LenisScroll from './components/routing/LenisScroll';
import RouteScrollReset from './components/routing/RouteScrollReset';
import { PRODUCT_DATA } from './data/products';
import Blog from './pages/Blog';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import TestimonialsPage from './pages/TestimonialsPage';
import { getProductPath } from './utils/productPaths';

function App() {
  return (
    <LenisScroll>
      <RouteScrollReset />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        {PRODUCT_DATA.map((product) => (
          <Route
            key={product.name}
            path={getProductPath(product)}
            element={<ProductPage product={product} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LenisScroll>
  );
}

export default App;
