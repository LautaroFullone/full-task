import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from '@/views/projects/CreateProjectView'
import EditProjectView from '@/views/projects/EditProjectView'
import DetailProjectView from '@/views/projects/DetailProjectView'
import AuthLayout from '@/layouts/AuthLayout'
import LoginView from '@/views/auth/LoginView'
import RegisterView from '@/views/auth/RegisterView'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import RequestNewCodeView from './views/auth/RequestNewCodeView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import ResetPasswordView from './views/auth/ResetPasswordView'
import ProjectTeamView from './views/projects/ProjectTeamView'
import ErrorView from './views/ErrorView'
import ProfileView from './views/profile/ProfileView'
import ChangePasswordView from './views/profile/ChangePasswordView'
import ProfileLayout from './layouts/ProfileLayout'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView />} index />
                    <Route path='/projects/create' element={<CreateProjectView />} />
                    <Route path='/projects/:projectID' element={<DetailProjectView />} />
                    <Route path='/projects/:projectID/edit' element={<EditProjectView />} />
                    <Route path='/projects/:projectID/team' element={<ProjectTeamView />} />

                    <Route element={<ProfileLayout />}>
                        <Route path='/profile' element={<ProfileView />} />
                        <Route path='/profile/password' element={<ChangePasswordView />} />
                    </Route>

                    <Route path='*' element={<Navigate to={'/error'} />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView />} />
                    <Route path='/auth/request-code' element={<RequestNewCodeView />} />
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView /> } />
                    <Route path='/auth/reset-password' element={<ResetPasswordView /> } />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/error' element={<ErrorView />} />
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}
