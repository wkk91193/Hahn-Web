import { IApplicantService } from './iapplicant-services';
import { IApplicant } from './../applicant-manager/iapplicant';

let latency = 200;
let id = 0;

function getId(){
  "use strict";
  return ++id;
}

let applicants = [
  {
    id:getId(),
    name:"Brett",
    familyName:"Lee",
    address:"Sydney,Australia",
    countryOfOrigin:"Australia",
    emailAddress:"bleee23@gmail.com",
    age:27,
    hired:true
  },
  {
    id:getId(),
    name:"Andrew",
    familyName:"Symonds",
    address:"Perth,Australia",
    countryOfOrigin:"Australia",
    emailAddress:"andrewsym34@gmail.com",
    age:25,
    hired:true
  },
  {
    id:getId(),
    name:"Ricky",
    familyName:"Ponting",
    address:"Perth,Australia",
    countryOfOrigin:"Australia",
    emailAddress:"rp1991@gmail.com",
    age:25,
    hired:true
  },
  {
    id:getId(),
    name:"Darren",
    familyName:"Lehmann",
    address:"Melbourne,Australia",
    countryOfOrigin:"Australia",
    emailAddress:"dl199145@gmail.com",
    age:25,
    hired:true
  }
];

export class InMemoryApplicantService implements IApplicantService {
  isRequesting = false;

  get(id: number) {
    this.isRequesting = true;
    return new Promise((resolve: any) => {
      setTimeout(() => {
        let found = applicants.filter( (c: IApplicant) => c.id === id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  getAll() {
    this.isRequesting = true;
    return new Promise( (resolve: any) => {
      setTimeout(() => {
        let results = applicants;
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  search(keyword: string) {
    this.isRequesting = true;
    return new Promise((resolve: any) => {
      setTimeout(() => {
        let results = applicants.filter((c: IApplicant) => ((c.name.indexOf(keyword) !== -1) ||
        (c.familyName.indexOf(keyword) !== -1)));
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  save(applicant: IApplicant) {
    this.isRequesting = true;
    return new Promise((resolve: any) => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(applicant));
        let found = applicants.filter((c: IApplicant) => c.id === applicant.id)[0];

        if(found) {
          let index = applicants.indexOf(found);
          applicants[index] = instance;
        } else {
          instance.id = getId();
          applicants.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }

  private getApplicantIndex(id: number) : number {
       return applicants.findIndex((c:IApplicant) => c.id === id);
  }

  delete(id: number) {
    this.isRequesting = true;
    return new Promise((resolve: any) => {
      setTimeout(() => {
        let found = applicants.filter((c: IApplicant) => c.id === id)[0];
        console.log("Deleting Contact " + id);
        var index = this.getApplicantIndex(id);
        applicants.splice(index,1);
        console.log("Deleted Contact " + id);
        console.log(applicants);
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  create() {
    this.isRequesting = true;
    return new Promise((resolve: any) => {
      setTimeout(() => {
        let newApplicant = {
          id:getId(),
          name:"",
          familyName:"",
          address:"",
          countryOfOrigin:"",
          emailAddress:"",
          age:0,
          hired:false
        };
        applicants.push(newApplicant);
        this.isRequesting = false;
        resolve(newApplicant);
      }, latency);
    });
  }
}
