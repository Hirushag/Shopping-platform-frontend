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
        path: "inventory",
        loadChildren: "./inventory/inventory.module#InventoryModule",
      },

      {
        path: "clients",
        loadChildren: "./clients/clients.module#ClientsModule",
      },

      {
        path: "payments",
        loadChildren: "./payments/payments.module#PaymentsModule",
      },
      {
        path: "cart",
        loadChildren: "./cart/cart.module#CartModule",
      },

      {
        path: "shopping",
        loadChildren: "./shopping/shopping.module#ShoppingModule",
      },

      {
        path: "suppliers",
        loadChildren: "./suppliers/suppliers.module#SuppliersModule",
      },
      {
        path: "delivery",
        loadChildren: "./delivery/delivery.module#DeliveryModule",
      },
      {
        path: "wishlist",
        loadChildren: "./wishlist/wishlist.module#WishlistModule",
      },
      {
        path: "feedback",
        loadChildren: "./feedback/feedback.module#FeedbackModule",
      },
      {
        path: "reports",
        loadChildren: "./reports/reports.module#ReportsModule",
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  // Not found
  { path: "**", redirectTo: "home" },
];
