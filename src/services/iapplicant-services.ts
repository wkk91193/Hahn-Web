import { IApplicant } from './../applicant-manager/iapplicant';

export interface IApplicantService {
  getAll();
  get(id: number);
  search(keyword: string);
  save(applicant: IApplicant);
  delete(id: number);
  create();
}
