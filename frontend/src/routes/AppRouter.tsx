import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MainLayout from '@/layouts/MainLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import LoadingScreen from '@/components/LoadingScreen';
import ProtectedRoute from '@/components/ProtectedRoute';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const AboutPage = lazy(() => import('@/pages/About/AboutPage'));
const ProductsPage = lazy(() => import('@/pages/Products/ProductsPage'));
const SDRProPage = lazy(() => import('@/pages/Products/SDRProPage'));
const LeadIntelligencePage = lazy(() => import('@/pages/Products/LeadIntelligencePage'));
const SalesPipelinePage = lazy(() => import('@/pages/Products/SalesPipelinePage'));
const SolutionsPage = lazy(() => import('@/pages/Solutions/SolutionsPage'));
const CaseStudySaasPage = lazy(() => import('@/pages/Solutions/CaseStudySaasPage'));
const CaseStudyStartupPage = lazy(() => import('@/pages/Solutions/CaseStudyStartupPage'));
const CaseStudyEcommercePage = lazy(() => import('@/pages/Solutions/CaseStudyEcommercePage'));
const CaseStudyFintechPage = lazy(() => import('@/pages/Solutions/CaseStudyFintechPage'));
const ResourcesPage = lazy(() => import('@/pages/Resources/ResourcesPage'));
const BlogPage = lazy(() => import('@/pages/Resources/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/Resources/BlogPostPage'));
const DocsPage = lazy(() => import('@/pages/Resources/DocsPage'));
const DocPage = lazy(() => import('@/pages/Resources/DocPage'));
const WhitepapersPage = lazy(() => import('@/pages/Resources/WhitepapersPage'));
const ContactPage = lazy(() => import('@/pages/Contact/ContactPage'));
const CalculatorPage = lazy(() => import('@/pages/Calculator/CalculatorPage'));
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'));
const AnalyticsPage = lazy(() => import('@/pages/Dashboard/AnalyticsPage'));
const LeadsPage = lazy(() => import('@/pages/Dashboard/LeadsPage'));
const ReportsPage = lazy(() => import('@/pages/Dashboard/ReportsPage'));
const SettingsPage = lazy(() => import('@/pages/Dashboard/SettingsPage'));
const DatabaseTestPage = lazy(() => import('@/pages/Database/DatabaseTest'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-pure-black">
    <div className="text-pure-white">Loading...</div>
  </div>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/sdr-pro" element={<SDRProPage />} />
            <Route path="products/lead-intelligence" element={<LeadIntelligencePage />} />
            <Route path="products/sales-pipeline" element={<SalesPipelinePage />} />
            <Route path="solutions" element={<SolutionsPage />} />
            <Route path="solutions/case-study/saas" element={<CaseStudySaasPage />} />
            <Route path="solutions/case-study/startup" element={<CaseStudyStartupPage />} />
            <Route path="solutions/case-study/ecommerce" element={<CaseStudyEcommercePage />} />
            <Route path="solutions/case-study/fintech" element={<CaseStudyFintechPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="resources/blog" element={<BlogPage />} />
            <Route path="resources/blog/:slug" element={<BlogPostPage />} />
            <Route path="resources/docs" element={<DocsPage />} />
            <Route path="resources/docs/:slug" element={<DocPage />} />
            <Route path="resources/whitepapers" element={<WhitepapersPage />} />
            <Route path="calculator" element={<CalculatorPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="database-test" element={<DatabaseTestPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;