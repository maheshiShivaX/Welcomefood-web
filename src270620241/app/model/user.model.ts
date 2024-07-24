export interface User {

    // landingUrl:string;
    // roleName: string,
    // roleId: number,
    // isLock: boolean,
    // isApproved: boolean,
    // isActive: boolean,
    // createdBy: number,
    // modifiedBy: number,
    // createdDate: string,
    // modifiedDate: string,
    // isDeleted: boolean,
    // loginId: number,
    // userId: string,
    // password: string,
    // name: string,
    // emailId: string,
    // mobileNo: number

    roleName:string,
    modifiedBy:number,
    createdDate:string,
    modifiedDate:string,
    isDeleted:boolean,
    loginId:number,
    employeeId:number,
    userId:string,
    password:string,
    roleId:number,
    isApproved:boolean,
    isLocked:boolean,
    isActive:boolean,
    createdBy:number
    landingUrl:string,
    name:string,
    companyId:number
    // Add other fields as needed
  }