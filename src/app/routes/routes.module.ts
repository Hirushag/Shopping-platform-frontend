import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslatorService } from "../core/translator/translator.service";
import { MenuService } from "../core/menu/menu.service";
import { SharedModule } from "../shared/shared.module";

import { menu } from "./menu";
import { routes } from "./routes";
import { LoginComponent } from "./login/login.component";

import { TableModule } from "primeng/table";

import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  imports: [
    SharedModule,
    TableModule,
    DropdownModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  declarations: [LoginComponent, RegisterComponent],
  exports: [RouterModule],
})
export class RoutesModule {
  constructor(public menuService: MenuService, tr: TranslatorService) {
    menuService.addMenu(menu);
  }
}
