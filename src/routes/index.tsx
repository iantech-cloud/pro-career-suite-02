import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

// Public pages
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import PricingPage from "../pages/public/PricingPage";
import AboutPage from "../pages/public/AboutPage";
import ContactPage from "../pages/public/ContactPage";
import BlogListPage from "../pages/public/BlogListPage";
import BlogSinglePage from "../pages/public/BlogSinglePage";
import ResumeTemplatesPage from "../pages/public/ResumeTemplatesPage";
import InterviewPrepPage from "../pages/public/InterviewPrepPage";
import LinkedInOptimizationPage from "../pages/public/LinkedInOptimizationPage";
import RemoteWorkGuidePage from "../pages/public/RemoteWorkGuidePage";
import SalaryNegotiationPage from "../pages/public/SalaryNegotiationPage";
import CareerTransitionPage from "../pages/public/CareerTransitionPage";
import PrivacyPolicyPage from "../pages/public/PrivacyPolicyPage";
import TermsPage from "../pages/public/TermsPage";
import CookiePolicyPage from "../pages/public/CookiePolicyPage";
import GDPRPage from "../pages/public/GDPRPage";
import UpgradePage from "../pages/public/UpgradePage";
import NotFound from "../pages/public/NotFound";

// Core pages
import MainDashboardPage from "../pages/core/MainDashboardPage";
import NotificationsPage from "../pages/core/NotificationsPage";
import BillingPage from "../pages/core/BillingPage";
import SettingsPage from "../pages/core/SettingsPage";
import DashboardPage from "../pages/app/DashboardPage";

// Module pages - CV Builder
import CvDashboardPage from "../modules/cvBuilder/pages/CvDashboardPage";
import CvEditorPage from "../modules/cvBuilder/pages/CvEditorPage";
import TemplateSelectionPage from "../modules/cvBuilder/pages/TemplateSelectionPage";

// Module pages - Social Publisher
import PublisherDashboardPage from "../modules/socialPublisher/pages/PublisherDashboardPage";
import ConnectionsPage from "../modules/socialPublisher/pages/ConnectionsPage";
import PostComposerPage from "../modules/socialPublisher/pages/PostComposerPage";
import PostHistoryPage from "../modules/socialPublisher/pages/PostHistoryPage";
import AnalyticsPage from "../modules/socialPublisher/pages/AnalyticsPage";

// Module pages - Job Aggregator
import JobSearchPage from "../modules/jobAggregator/pages/JobSearchPage";
import SavedJobsPage from "../modules/jobAggregator/pages/SavedJobsPage";
import JobAlertsPage from "../modules/jobAggregator/pages/JobAlertsPage";
import SingleJobViewPage from "../modules/jobAggregator/pages/SingleJobViewPage";

// Admin pages
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminManageContentPage from "../pages/admin/AdminManageContentPage";
import AdminManageUsersPage from "../pages/admin/AdminManageUsersPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:slug" element={<BlogSinglePage />} />
      <Route path="/resources/resume-templates" element={<ResumeTemplatesPage />} />
      <Route path="/resources/interview-prep" element={<InterviewPrepPage />} />
      <Route path="/resources/linkedin-optimization" element={<LinkedInOptimizationPage />} />
      <Route path="/resources/remote-work-guide" element={<RemoteWorkGuidePage />} />
      <Route path="/resources/salary-negotiation" element={<SalaryNegotiationPage />} />
      <Route path="/resources/career-transition" element={<CareerTransitionPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/cookies" element={<CookiePolicyPage />} />
      <Route path="/gdpr" element={<GDPRPage />} />
      <Route path="/upgrade" element={<UpgradePage />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <MainDashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/main-dashboard" 
        element={
          <ProtectedRoute>
            <MainDashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/app-dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />

      {/* Core Management Routes */}
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/billing" 
        element={
          <ProtectedRoute>
            <BillingPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } 
      />
      
      {/* CV Builder Module */}
      <Route 
        path="/cv-builder" 
        element={
          <ProtectedRoute>
            <CvDashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/cv-builder/templates" 
        element={
          <ProtectedRoute>
            <TemplateSelectionPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/cv-builder/new" 
        element={
          <ProtectedRoute>
            <CvEditorPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/cv-builder/edit/:id" 
        element={
          <ProtectedRoute>
            <CvEditorPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Social Publisher Module */}
      <Route 
        path="/social-publisher" 
        element={
          <ProtectedRoute>
            <PublisherDashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/social-publisher/connections" 
        element={
          <ProtectedRoute>
            <ConnectionsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/social-publisher/compose" 
        element={
          <ProtectedRoute>
            <PostComposerPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/social-publisher/history" 
        element={
          <ProtectedRoute>
            <PostHistoryPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/social-publisher/analytics" 
        element={
          <ProtectedRoute requiredTier="pro">
            <AnalyticsPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Job Aggregator Module */}
      <Route 
        path="/jobs" 
        element={
          <ProtectedRoute>
            <JobSearchPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/:id" 
        element={
          <ProtectedRoute>
            <SingleJobViewPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/saved" 
        element={
          <ProtectedRoute>
            <SavedJobsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/alerts" 
        element={
          <ProtectedRoute>
            <JobAlertsPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredTier="admin">
            <AdminDashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/content" 
        element={
          <ProtectedRoute requiredTier="admin">
            <AdminManageContentPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/users" 
        element={
          <ProtectedRoute requiredTier="admin">
            <AdminManageUsersPage />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};