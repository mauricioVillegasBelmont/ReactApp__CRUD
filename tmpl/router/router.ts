
import { createHashRouter } from "react-router-dom";


// import Root, { rootLoader } from "./routes/root";
// import Team, { teamLoader } from "./routes/team";

const router = createHashRouter([
  // {
  //   path: "/",
  //   element: <Root />,
  //   loader: rootLoader,
  //   children: [
  //     {
  //       path: "team",
  //       element: <Team />,
  //       loader: teamLoader,
  //     },
  //   ],
  // },
]);

export default router;

// <RouterProvider router={router} />;