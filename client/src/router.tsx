import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from '@/views/projects/CreateProjectView'
import EditProjectView from '@/views/projects/EditProjectView'
import DetailProjectView from '@/views/projects/DetailProjectView'
import AuthLayout from '@/layouts/AuthLayout'
import LoginView from '@/views/auth/LoginView'
import RegisterView from '@/views/auth/RegisterView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView />} index />
                    <Route path='/projects/create' element={<CreateProjectView />} />
                    <Route path='/projects/:projectID' element={<DetailProjectView />} />
                    <Route path='/projects/:projectID/edit' element={<EditProjectView />} />
                    <Route path='*' element={<Navigate to={'/'} />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}
