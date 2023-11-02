import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Windmill } from '@windmill/react-ui';
import './operator/assets/css/custom.css';
import './operator/assets/css/tailwind.css';
// import './operator/assets/css/tailwind.output.css';
import '@pathofdev/react-tag-input/build/index.css';
import App from './App';
import myTheme from './operator/assets/theme/myTheme';
import { AdminOperatorProvider } from './operator/context/AdminContext';
import { createRoot } from 'react-dom/client';
import { SidebarOperatorProvider } from './operator/context/SidebarContext';
import { AdminAdminProvider } from './admin/context/AdminContext';
import { SidebarAdminProvider } from './admin/context/SidebarContext';
import store from './store'
import ThemeSuspense from './operator/components/theme/ThemeSuspense';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";

createRoot(document.getElementById('root')).render(
  <Router>
    <AdminAdminProvider>
      <SidebarAdminProvider>
        <AdminOperatorProvider>
          <SidebarOperatorProvider>
            <Suspense fallback={<ThemeSuspense />}>
              <Windmill usePreferences theme={myTheme}>
                <Provider store={store}>
                  <App />
                  
                </Provider>
              </Windmill>
            </Suspense>
          </SidebarOperatorProvider>
        </AdminOperatorProvider>
      </SidebarAdminProvider>
    </AdminAdminProvider>
  </Router>,
);

// ReactDOM.render(
//   // <Provider store={store}>
//     <Router>
//     <AdminAdminProvider>
//       <SidebarAdminProvider>
//         <AdminOperatorProvider>
//           <SidebarOperatorProvider>
//             <Suspense fallback={<ThemeSuspense />}>
//               <Windmill usePreferences theme={myTheme}>
//                 <Provider store={store}>
//                   <PersistGate loading={null} persistor={persistor}>
                 
//                   <App />
               
//                   </PersistGate>
//                 </Provider>
//               </Windmill>
//             </Suspense>
//           </SidebarOperatorProvider>
//         </AdminOperatorProvider>
//       </SidebarAdminProvider>
//     </AdminAdminProvider>
    
//     </Router>,
//   // </Provider>,

//   document.getElementById('root')
// );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
