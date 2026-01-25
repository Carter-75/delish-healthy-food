import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import LoadingState from './components/LoadingState';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/animations.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const RecipeCategoryPage = lazy(() => import('./pages/RecipeCategoryPage'));
const RecipeDetailPage = lazy(() => import('./pages/RecipeDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AllIngredientsPage = lazy(() => import('./pages/AllIngredientsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <ErrorBoundary>
          <Layout>
            <Suspense fallback={<LoadingState label="Loading page" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:categoryId" element={<RecipeCategoryPage />} />
                <Route path="/recipe/:categoryId/:recipeId" element={<RecipeDetailPage />} />
                <Route path="/all-ingredients" element={<AllIngredientsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;
