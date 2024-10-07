export const environment = {
  production: false,
  hmr: false,
  config:{
    apiUrl:'https://localhost:44350/api/'
    //apiUrl:'https://www.indianfilms.in/eBuilderAPI/api/'
  },
  appVersion: 'v8.0.27',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  apiUrl: 'https://localhost:44350/api/',
  //apiUrl:'https://www.indianfilms.in/eBuilderAPI/api/',
  appThemeName: 'Metronic',
  appPurchaseUrl: '',
  appHTMLIntegration: '',
  appPreviewUrl: '',
  appPreviewAngularUrl: '',
  appPreviewDocsUrl: '',
  appPreviewChangelogUrl: '',
  // apiUrl: 'mysite.com/api',
  appDemos: {
    'demo1': {
      'title': 'Demo 1',
      'description': 'Default Dashboard',
      'published': true,
      'thumbnail': './assets/media/demos/demo1.png'
    },
    'demo2': {
      'title': 'Demo 2',
      'description': 'SaaS Application',
      'published': false,
      'thumbnail': './assets/media/demos/demo2.png'
    }
  },
  // inspections Api urls 
  Login:"LoginDetail/GetLoginDetailByUserPass",
  //Login:"LoginDetail/GetLoginDetailByUserPass",
  //Login:"LoginDetail/GetLoginDetailByUserPass",
  //menus 


  
  GetRequirementStatusAll:"Requirement/GetRequirementStatusAll",
  GetRequirementStatusById:"Requirement/GetRequirementStatusById",
  SaveRequirementStatus:"Requirement/SaveRequirementStatus",
  DeleteRequirementStatusById:"Requirement/DeleteRequirementStatusById",
  ActiveRequirementStatusById:"Requirement/ActiveRequirementStatusById",
  GetRequirementStatus:"Requirement/GetRequirementStatus",

  GetRequirementTypeAll:"Requirement/GetRequirementTypeAll",
  GetRequirementTypeById:"Requirement/GetRequirementTypeById",
  SaveRequirementType:"Requirement/SaveRequirementType",
  DeleteRequirementTypeById:"Requirement/DeleteRequirementTypeById",
  ActiveRequirementTypeById:"Requirement/ActiveRequirementTypeById",
  GetRequirementType:"Requirement/GetRequirementType",

  SaveClientRequirement:"ClientRequirement/SaveClientRequirement",
  GetClientRequirementByProjectIdClientId:"ClientRequirement/GetClientRequirementByProjectIdClientId",
  GetClientRequirementById:"ClientRequirement/GetClientRequirementById",
  DeleteClientRequirementById:"ClientRequirement/DeleteClientRequirementById",

  
  GetRolePermissionByRoleId:"RolePermission/GetRolePermissionByRoleId",
  get_country_list:"get_country_list",
  

  // Dynamic controls
  
  //Defects
  //getDefectCategories: 'inspections/getdefectcategories',
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
