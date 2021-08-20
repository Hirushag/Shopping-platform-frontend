import { LayoutComponent } from "../layout/layout.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "../core/_guards/auth.guard";
import { RegisterComponent } from "./register/register.component";

export const routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "settings",
        loadChildren: "./settings/settings.module#SettingsModule",
      },

      {
        path: "clients",
        loadChildren: "./clients/clients.module#ClientsModule",
      },

            {
        path: "payments",
        loadChildren: "./payments/payments.module#PaymentsModule",
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  // Not found
  { path: "**", redirectTo: "home" },
];
