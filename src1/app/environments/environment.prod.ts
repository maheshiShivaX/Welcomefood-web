export const environment = {
  production: true,
  hmr: false,
  config: {
   // apiUrl:"https://www.indianfilms.in/wfapi/api/",
    //apiUrl:"http://stage.ishivaxservices.com/admin_panel/public/api/",
    apiUrlother: "https://anutechinfra.com/anutechAPI/api/",
    apiUrlsms: "http://sms.ishivax.in/api/",
   // apiUrl1:"https://anutechinfra.com/anutechAPI/"
    // apiUrl:"https://anutechinfra.com/anutechAPI/api/"
   apiUrl: 'https://localhost:7025/api/'
    //apiUrl:'https://www.indianfilms.in/eBuilderAPI/api/'

  },


  siteurl: "https://anutechinfra.com/anutechAPI/",
  appVersion: 'v1.0.0',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  //apiurl:"https://anutechinfra.com/anutechAPI/api/",
  apiurl: "https://localhost:7138/api/",
  //apiUrl: 'https://localhost:44350/api/',
  //apiUrl: 'https://www.indianfilms.in/eBuilderAPI/api/',
  DateFormat: 'yyyy-MM-dd hh:mm a',
  appThemeName: 'Metronic',
  appPurchaseUrl: '',
  appHTMLIntegration: '',
  appPreviewUrl: '',
  appPreviewAngularUrl: '',
  appPreviewDocsUrl: '',
  appPreviewChangelogUrl: '',

  GetLoginDetailByUserIdPassword: "LoginDetail/GetLoginDetailByUserIdPassword",
  GetLoginDetails: "LoginDetail/GetLoginDetails",
  ApprovedLoginDetailById: "LoginDetail/ApprovedLoginDetailById",
  LockedLoginDetailById: "LoginDetail/LockedLoginDetailById",
  ActiveLoginDetailById: "LoginDetail/ActiveLoginDetailById",
  GetLoginDetailByRole: "LoginDetail/GetLoginDetailByRole",

  GetMenuDetailByTypeId: "RolePermission/GetMenuDetailByTypeId",
  SaveLoginDetail: "LoginDetail/SaveLoginDetail",
  SaveStoreDetail: "StoreDetail/SaveStoreDetail",
  GetStoreDetailAll: "StoreDetail/GetStoreDetailAll",
  GetStoreDetail: "StoreDetail/GetStoreDetail",
  DeleteStoreDetailById: "StoreDetail/DeleteStoreDetailById",


  DeleteEmployeeDetailById: "EmployeeDetail/DeleteEmployeeDetailById",
  GetEmployeeDetailAll: "EmployeeDetail/GetEmployeeDetailAll",
  GetEmployeeDetail: "EmployeeDetail/GetEmployeeDetail",
  SaveEmployeeDetail: "EmployeeDetail/SaveEmployeeDetail",


  DeleteProductCategoryById: "ProductCategory/DeleteProductCategoryById",
  GetProductCategoryAll: "ProductCategory/GetProductCategoryAll",
  GetProductCategory: "ProductCategory/GetProductCategory",
  GetProductCategoryById: "ProductCategory/GetProductCategoryById",
  SaveProductCategory: "ProductCategory/SaveProductCategory",
  GetProductCategoryByGroupId:"ProductCategory/GetProductCategoryByGroupId",

  DeleteProductDetailById: "ProductDetail/DeleteProductDetailById",
  GetProductDetailAll: "ProductDetail/GetProductDetailAll",
  GetProductDetail: "ProductDetail/GetProductDetail",
  GetProductDetailById: "ProductDetail/GetProductDetailById",
  SaveProductDetail: "ProductDetail/SaveProductDetail",
  GetProductDetailbyCategoryId: "ProductDetail/GetProductDetailbyCategoryId",


  GetRole: "Role/GetRole",

  GetEmployeeStore: "EmployeeStore/GetEmployeeStore",
  SaveEmployeeStore: "EmployeeStore/SaveEmployeeStore",
  DeleteEmployeeStoreById: "EmployeeStore/DeleteEmployeeStoreById",
  ActiveEmployeeStoreById: "EmployeeStore/ActiveEmployeeStoreById",
  GetEmployeeStoreByUserId:"EmployeeStore/GetEmployeeStoreByUserId",


  SaveStoreProduct: "StoreProduct/SaveStoreProduct",
  GetStoreProduct: "StoreProduct/GetStoreProduct",
  DeleteStoreProductById: "StoreProduct/DeleteStoreProductById",
  ActiveStoreProductById: "StoreProduct/ActiveStoreProductById",

  GetProductGroup:"ProductGroup/GetProductGroup",
  SaveItemSale:"ItemSale/SaveItemSale",
  GetItemSalebyCategoryid:"ItemSale/GetItemSalebyCategoryid",
  GetTotalCashinhandByDate:"ItemSale/GetTotalCashinhandByDate",
  GetAmountByGroupId:"ItemSale/GetAmountByGroupId",
  PDeleteItemSaleById:"ItemSale/PDeleteItemSaleById/",

  GetStoreProductByStoreId:"StoreProduct/GetStoreProductByStoreId",
  GetProductCategoryByStoreGroupId:"StoreProduct/GetProductCategoryByStoreGroupId",
  GetProductbyStoreId:"StoreProduct/GetProductbyStoreId",
  GetInsideSale:"StoreProduct/GetInsideSale",
  GetOtherSale:"StoreProduct/GetOtherSale",


  SaveVendorDetail:"VendorDetail/SaveVendorDetail",
  GetVendorDetail:"VendorDetail/GetVendorDetail",
  DeleteVendorDetailById:"VendorDetail/DeleteVendorDetailById",

  SaveExpenseHead:"ExpenseHead/SaveExpenseHead",
  GetExpenseHead:"ExpenseHead/GetExpenseHead",
  DeleteExpenseHeadById:"ExpenseHead/DeleteExpenseHeadById",

  GetExpenseGroup:"ExpenseGroup/GetExpenseGroup",
  GetExpenseCategoryByGroupId:"ExpenseCategory/GetExpenseCategoryByGroupId",


  GetPayMode:"PayMode/GetPayMode",


  SaveExpenseItem:"ExpenseItem/SaveExpenseItem",
  GetExpenseItemsById:"ExpenseItem/GetExpenseItemsById",
};

