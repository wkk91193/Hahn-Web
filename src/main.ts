import {Aurelia} from 'aurelia-framework';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import "../styles/styles.css";
import "../node_modules/font-awesome/css/font-awesome.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../styles/bootstrap-flat.css";
import "../styles/bootstrap-flat-extras.css";
import "../styles/awesome-bootstrap-checkbox.css";

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-dialog')
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('shell/shell')));
}
