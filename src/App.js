import { Route, Routes } from 'react-router-dom'
import DashBoard from './Pages/DashBoard'
import Login from './Pages/Login'
import ManageRole from './Pages/ManageRole'
import ManageHotels from './Pages/ManageHotels'
import Schedule from './Pages/Schedule'
import Tickets from './Pages/Tickets'
import ManageReferral from './Pages/ManageReferral'
import Payments from './Pages/Payments'
import Deposit from './Pages/Deposit'
import Withdrawal from './Pages/Withdrawal'
import GatewaySettings from './Pages/GatewaySettings'
import EmailManager from './Pages/EmailManager'
import GeneralSettings from './Pages/GeneralSettings'
import ManageLanguage from './Pages/ManageLanguage'
import ManageTheme from './Pages/ManageTheme'
import CommissionLog from './Pages/CommissionLog'
import ManageMobile from './Pages/ManageMobile'
import Newsletter from './Pages/Newsletter'
import Report from './Pages/Report'
import UpdateSystem from './Pages/UpdateSystem'
import ManagerUsers from './Pages/ManageUsers'
import PrivateRoute from './Pages/PrivateRoute'
import { Overview } from './Pages/dashboard/Overview'
import Reservations from './Pages/Reservations'
import ManageRooms from './Pages/ManageRooms'
import StaffSection from './Pages/StaffSection'
import Reports from './Pages/Reports'
import GuestReviews from './Pages/GuestReviews'
import ActiveUsers from './Pages/manage-users/ActiveUsers'
import Analytics from './Pages/dashboard/Analytics'

function App () {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<DashBoard />} />
        </Route>
        <Route path='/dashboard/analytics' element={<Analytics />} />
        <Route path='/dashboard/analytics' element={<Analytics />} />
        <Route exact path='/Reservations' element={<Reservations />} />
        <Route exact path='/manage-rooms' element={<ManageRooms />} />
        <Route exact path='/staff-scetion' element={<StaffSection />} />
        <Route exact path='/Reports' element={<Reports />} />
        <Route exact path='/guest-reviews' element={<GuestReviews />} />
        <Route exact path='/Reservations' element={<Reservations />} />
        <Route exact path='/manage-role' element={<ManageRole />} />
        <Route exact path='/manage-users' element={<ManagerUsers />} />
        <Route exact path='/manage-user/active' element={<ActiveUsers />} />
        <Route exact path='/manage-hotels' element={<ManageHotels />} />
        <Route exact path='/schedule' element={<Schedule />} />
        <Route exact path='/tickets' element={<Tickets />} />
        <Route exact path='/manage-referral' element={<ManageReferral />} />
        <Route exact path='/payments' element={<Payments />} />
        <Route exact path='/deposit' element={<Deposit />} />
        <Route exact path='/withdrawal' element={<Withdrawal />} />
        <Route exact path='/gateway-settings' element={<GatewaySettings />} />
        <Route exact path='/email-manager' element={<EmailManager />} />
        <Route exact path='/general-settings' element={<GeneralSettings />} />
        <Route exact path='/manage-language' element={<ManageLanguage />} />
        <Route exact path='/manage-theme' element={<ManageTheme />} />
        <Route exact path='/commission-log' element={<CommissionLog />} />
        <Route exact path='/manage-mobile' element={<ManageMobile />} />
        <Route exact path='/newsletter' element={<Newsletter />} />
        <Route exact path='/report' element={<Report />} />
        <Route exact path='/update-system' element={<UpdateSystem />} />
      </Routes>
    </div>
  )
}

export default App
