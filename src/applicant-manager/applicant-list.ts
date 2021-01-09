import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {InMemoryApplicantService} from "../services/in-memory-applicant-service";
import {ApplicantViewed, ApplicantUpdated} from "../resources/messages/applicant-messages";
import {EventAggregator} from "aurelia-event-aggregator";
import {IApplicant} from "./IApplicant";

@inject(Router, InMemoryApplicantService, EventAggregator)
export class ApplicantList{
    applicants;
    selectedId = 0;
    keyword: string;

    constructor(private router: Router, private applicantService: InMemoryApplicantService,
        ea: EventAggregator) {
        ea.subscribe(ApplicantViewed, msg => this.select(msg.contact));
        ea.subscribe(ApplicantUpdated, msg => {
            let id = msg.contact.id;
            let found = this.applicants.find(x => x.id === id);
            Object.assign(found, msg.contact);
        });
    }

    created() {
        this.applicantService.getAll().then(applicants => this.applicants = applicants);
    }

    async search() {
        if(this.keyword) {
            await this.applicantService.search(this.keyword).then(applicants => this.applicants = applicants);
        } else {
           await this.applicantService.getAll().then(applicants => this.applicants = applicants); 
        }
        if(this.applicants && this.applicants.length > 0)
        {
            this.select(this.applicants[0]);
            this.router.navigate(`applicants/${this.selectedId}`);
        }
    }

    select(contact) {
        this.selectedId = contact.id;
        return true;
    }

    async create() {
        await this.applicantService.create().then(
            (applicant: IApplicant) => {
                this.applicants.push(applicant);
                console.log(applicant);
                this.selectedId = applicant.id;
                this.router.navigate(`applicants/${this.selectedId}`);
            }
         );
        return true;
    }

    async delete(id) {
        await this.applicantService.delete(id).then(
            response => {
                console.log(response);
                this.selectedId = 0;
                this.applicantService.getAll().then(applicants => this.applicants = applicants);
                this.router.navigate("");
            }
         );
        return true;
    }
}
