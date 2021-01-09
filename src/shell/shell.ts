import {Router, RouterConfiguration} from "aurelia-router";
import { PLATFORM } from 'aurelia-framework';

export class Shell {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Modern";
    config.map([
      { route: "", redirect: "applicantmanager"},
      { route: "applicantmanager", name:"applicantmanager", moduleId: PLATFORM.moduleName("applicant-manager/index"), nav: true, title: "Applicant Manager" }
    ]);

    this.router = router;
  }
}
