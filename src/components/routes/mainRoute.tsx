import { Suspense } from "react";
import { BrowserRouter as Router, Routes as Switch, Route} from 'react-router-dom';

import { ProtectedRoute } from "./";
import { getLoadingMarkup } from "../assets/components";
import { DashboardScreen, Stat, EmailConfirmation, ForgotPasswordScreen, LoginScreen, RegisterScreen, ResetPasswordScreen, Setting, ValidateTwoFA, VerifyEmail } from "../screens";
import { SharedLayout, Home, About, Products, Profile, SingleProfile, FourOFour } from "../pages";

const MainRoute: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={getLoadingMarkup()}>
        <Switch>
          <Route path="/" element={ <SharedLayout /> }>
              <Route 
              index 
              element={ <Home /> }
              />
              <Route 
              path="profile" 
              element={ <ProtectedRoute><Profile/></ProtectedRoute> }
              />
            <Route 
            path="profile/:username" 
            element={ <ProtectedRoute><SingleProfile/></ProtectedRoute> }
            />
              <Route 
              path="about" 
              element={ <About/> }
              />
              <Route 
              path="products" 
              element={ <Products/> }
              />
              <Route 
              path="dashboard" 
              element={<ProtectedRoute><DashboardScreen/></ProtectedRoute>}
              >
                    <Route 
                    path="stat" 
                    element={<Stat/>}
                    />
              </Route>
              <Route 
              path="setting" 
              element={<ProtectedRoute><Setting/></ProtectedRoute>}
              />
              <Route 
              path="signin" 
              element={<LoginScreen />}
              />
              <Route 
              path="signup" 
              element={<RegisterScreen />}
              />
              <Route 
              path="emailconfirm" 
              element={<EmailConfirmation/>}
              />
              <Route 
              path="verifyemail" 
              element={<VerifyEmail/>}
              />
              <Route 
              path="validatetwofa" 
              element={<ValidateTwoFA/>}
              />
              <Route 
              path="forgotpassword" 
              element={<ForgotPasswordScreen/>}
              />
              <Route 
              path="passwordreset/:resetToken" 
              element={<ResetPasswordScreen />}
              />
              <Route 
              path="*" 
              element={<FourOFour/>}
              />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default MainRoute;
