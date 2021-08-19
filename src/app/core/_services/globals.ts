import { environment } from "../../../environments/environment";

// Define global variables for services here

export const GlobalVariable = Object.freeze({
  BaseUrl: environment.baseUrl // Always use trailing / at the end
});

// ng build --prod --aot
