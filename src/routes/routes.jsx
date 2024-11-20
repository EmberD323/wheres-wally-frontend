import App from '../App.jsx';
import ScorePage from '../components/Scorepage.jsx';
import HomePage from '../components/Homepage.jsx';


const routes = [
  {
    path: "/",
    element: <App />,
    children:[
      { index: true, element: <HomePage /> },
      {path: "homepage",element: <HomePage/>},
      {path: "scorepage",element: <ScorePage/>},

      
    ]
  },
];
export default routes;
