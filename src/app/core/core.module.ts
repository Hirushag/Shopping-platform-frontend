import { ClientService } from "./_services/client.service";
import { NgModule, Optional, SkipSelf } from "@angular/core";

import { SettingsService } from "./settings/settings.service";
import { ThemesService } from "./themes/themes.service";
import { TranslatorService } from "./translator/translator.service";
import { MenuService } from "./menu/menu.service";

import { throwIfAlreadyLoaded } from "./module-import-guard";
import { AuthGuard } from "./_guards/auth.guard";
import { ToasterService } from "../../../node_modules/angular2-toaster";
import { AuthenticationService } from "./_services/authentication.service";
import { UserService } from "./_services/user.service";

@NgModule({
  imports: [],
  providers: [
    SettingsService,
    ThemesService,
    TranslatorService,
    MenuService,
    AuthGuard,
    ToasterService,

    // System end points
    AuthenticationService,
    UserService,
    ClientService,
  ],
  declarations: [],
  exports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}
