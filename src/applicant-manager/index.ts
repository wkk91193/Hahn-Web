import {PLATFORM} from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";

export class Index {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Aurelia Contact Manager";
    config.map([
      { route: "", moduleId:  PLATFORM.moduleName("applicant-manager/no-selection"), nav: true, title: "Appliant Manager",  name:"applicantmanager"  },
      { route: "applicants/:id", moduleId:PLATFORM.moduleName("applicant-manager/applicant-detail"), nave:true,  name:"applicants" }
    ]);

    this.router = router;
  }
}
