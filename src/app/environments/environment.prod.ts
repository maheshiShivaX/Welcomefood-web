export const environment = {
  production: true,
  hmr: false,
  config: {
    //apiUrl:"https://www.indianfilms.in/wfapi/api/",
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
  GetLoginDetailsByCompanyId: "LoginDetail/GetLoginDetailsByCompanyId",
  GetLoginDetailByCompanyRole: "LoginDetail/GetLoginDetailByCompanyRole",

  GetMenuDetailByTypeId: "RolePermission/GetMenuDetailByTypeId",
  SaveLoginDetail: "LoginDetail/SaveLoginDetail",
  SaveStoreDetail: "StoreDetail/SaveStoreDetail",
  GetStoreDetailAll: "StoreDetail/GetStoreDetailAll",
  GetStoreDetail: "StoreDetail/GetStoreDetail",
  DeleteStoreDetailById: "StoreDetail/DeleteStoreDetailById",
  GetStoreDetailbyCompanyId: "StoreDetail/GetStoreDetailbyCompanyId",


  DeleteEmployeeDetailById: "EmployeeDetail/DeleteEmployeeDetailById",
  GetEmployeeDetailAll: "EmployeeDetail/GetEmployeeDetailAll",
  GetEmployeeDetail: "EmployeeDetail/GetEmployeeDetail",
  SaveEmployeeDetail: "EmployeeDetail/SaveEmployeeDetail",
  GetEmployeeDetailbyCompanyId: "EmployeeDetail/GetEmployeeDetailbyCompanyId",


  DeleteProductCategoryById: "ProductCategory/DeleteProductCategoryById",
  GetProductCategoryAll: "ProductCategory/GetProductCategoryAll",
  GetProductCategory: "ProductCategory/GetProductCategory",
  GetProductCategoryById: "ProductCategory/GetProductCategoryById",
  SaveProductCategory: "ProductCategory/SaveProductCategory",
  GetProductCategoryByGroupId: "ProductCategory/GetProductCategoryByGroupId",

  DeleteProductDetailById: "ProductDetail/DeleteProductDetailById",
  GetProductDetailAll: "ProductDetail/GetProductDetailAll",
  GetProductDetail: "ProductDetail/GetProductDetail",
  GetProductDetailById: "ProductDetail/GetProductDetailById",
  SaveProductDetail: "ProductDetail/SaveProductDetail",
  GetProductDetailbyCategoryId: "ProductDetail/GetProductDetailbyCategoryId",


  GetRole: "Role/GetRole",
  GetForAdminRole: "Role/GetForAdminRole",

  GetEmployeeStore: "EmployeeStore/GetEmployeeStore",
  SaveEmployeeStore: "EmployeeStore/SaveEmployeeStore",
  DeleteEmployeeStoreById: "EmployeeStore/DeleteEmployeeStoreById",
  ActiveEmployeeStoreById: "EmployeeStore/ActiveEmployeeStoreById",
  GetEmployeeStoreByUserId: "EmployeeStore/GetEmployeeStoreByUserId",
  GetEmployeeStoreByCompanyId: "EmployeeStore/GetEmployeeStoreByCompanyId",
  GetEmployeeByStoreId: "EmployeeStore/GetEmployeeByStoreId",

  SaveStoreProduct: "StoreProduct/SaveStoreProduct",
  GetStoreProduct: "StoreProduct/GetStoreProduct",
  DeleteStoreProductById: "StoreProduct/DeleteStoreProductById",
  ActiveStoreProductById: "StoreProduct/ActiveStoreProductById",
  SaveStoreProductBulk: "StoreProduct/SaveStoreProductBulk",



  GetProductGroup: "ProductGroup/GetProductGroup",
  SaveItemSale: "ItemSale/SaveItemSale",
  GetItemSalebyCategoryid: "ItemSale/GetItemSalebyCategoryid",
  GetTotalCashinhandByDate: "ItemSale/GetTotalCashinhandByDate",
  GetAmountByGroupId: "ItemSale/GetAmountByGroupId",
  PDeleteItemSaleById: "ItemSale/PDeleteItemSaleById",
  GetItemSaleByStoreCategoryByStoreId: "ItemSale/GetItemSaleByStoreCategoryByStoreId",


  GetStoreProductByStoreId: "StoreProduct/GetStoreProductByStoreId",
  GetProductCategoryByStoreGroupId: "StoreProduct/GetProductCategoryByStoreGroupId",
  GetProductbyStoreId: "StoreProduct/GetProductbyStoreId",
  GetInsideSale: "StoreProduct/GetInsideSale",
  GetOtherSale: "StoreProduct/GetOtherSale",


  SaveVendorDetail: "VendorDetail/SaveVendorDetail",
  GetVendorDetail: "VendorDetail/GetVendorDetail",
  DeleteVendorDetailById: "VendorDetail/DeleteVendorDetailById",
  GetVendorDetailByComapnyId: "VendorDetail/GetVendorDetailByComapnyId",

  SaveExpenseHead: "ExpenseHead/SaveExpenseHead",
  GetExpenseHead: "ExpenseHead/GetExpenseHead",
  DeleteExpenseHeadById: "ExpenseHead/DeleteExpenseHeadById",

  GetExpenseGroup: "ExpenseGroup/GetExpenseGroup",
  GetExpenseCategoryByGroupId: "ExpenseCategory/GetExpenseCategoryByGroupId",


  GetPayMode: "PayMode/GetPayMode",


  SaveExpenseItem: "ExpenseItem/SaveExpenseItem",
  GetExpenseItemsById: "ExpenseItem/GetExpenseItemsById",


  SaveItemPurchase: "ItemPurchase/SaveItemPurchase",
  GetItemPurchaseByDatestoreId: "ItemPurchase/GetItemPurchaseByDatestoreId",
  GetItemPurchaseByStoreId: "ItemPurchase/GetItemPurchaseByStoreId",


  SaveGesDetail: "GesInventory/SaveGesDetail",
  GetGesdetailByDateStoreId: "GesInventory/GetGesdetailByDateStoreId",
  GetExpenseItemsByAmountDate: "ExpenseItem/GetExpenseItemsByAmountDate",
  GetExpenseItemsByAmountDateGroup: "ExpenseItem/GetExpenseItemsByAmountDateGroup",
  GetExpenseItemsByStoreDateId: "ExpenseItem/GetExpenseItemsByStoreDateId",



  GetGesdetailByDateStoreIdonRest: "GesInventory/GetGesdetailByDateStoreIdonRest",
  SaveExpenseItems: "ExpenseItem/SaveExpenseItems",

  StoreClosing: "StoreClosing/SaveStoreClosing",
  GetStoreClosingByStoreId: "StoreClosing/GetStoreClosingByStoreId",
  GetStoreOpeningDetailById: "StoreClosing/GetStoreOpeningDetailById",
  SaveOpeningBalance: "StoreClosing/SaveOpeningBalance",
  GetStoreOpeningCashByStoreId: "StoreClosing/GetStoreOpeningCashByStoreId",

  GetPLStoreDetail: "PLReport/GetPLStoreDetail",

  SaveExpenseGroup: "ExpenseGroup/SaveExpenseGroup",
  DeleteExpenseGroupById: "ExpenseGroup/DeleteExpenseGroupById",
  GetExpenseGroupByCompanyId: "ExpenseGroup/GetExpenseGroupByCompanyId",

  DeleteExpenseCategoryById: "ExpenseCategory/DeleteExpenseCategoryById",
  SaveExpenseCategory: "ExpenseCategory/SaveExpenseCategory",
  ExpenseItemDetailByDateCompanyId: "ExpenseCategory/ExpenseItemDetailByDateCompanyId",
  GetExpenseCategoriesByGroupId: "ExpenseCategory/GetExpenseCategoriesByGroupId",

  SaveSalaryTransaction: "SalaryTransaction/SaveSalaryTransaction",
  GetSalaryTransactionByStoreId: "SalaryTransaction/GetSalaryTransactionByStoreId",
  DeleteSalaryTransactionById: "SalaryTransaction/DeleteSalaryTransactionById",

SaveIncomeType:"IncomeType/SaveIncomeType",
DeleteIncomeTypeById:"IncomeType/DeleteIncomeTypeById",
GetIncomeType:"IncomeType/GetIncomeType",
GetIncomeTypeByCompanyId:"IncomeType/GetIncomeTypeByCompanyId",

SaveOtherIncome:"OtherIncome/SaveOtherIncome",
DeleteOtherIncomeById:"OtherIncome/DeleteOtherIncomeById",
GetOtherIncomebyStoreId:"OtherIncome/GetOtherIncomebyStoreId",


SaveGesInvoice:"GesInvoice/SaveGesInvoice",
DeleteGesInvoiceById:"GesInvoice/DeleteGesInvoiceById",
GetGesInvoiceByStoreIdDate:"GesInvoice/GetGesInvoiceByStoreIdDate",


GetGesTransactionByIdStoreIdDate:"GesType/GetGesTransactionByIdStoreIdDate",
SaveGes:"GesTransaction/SaveGes",

SaveCreditCard:"CreditCard/SaveCreditCard",
DeleteCreditCardById:"CreditCard/DeleteCreditCardById",
GetCreditCard:"CreditCard/GetCreditCard",
GetCreditCardByStoreId:"CreditCard/GetCreditCardByStoreId",
GetCreditCardByCompanyId:"CreditCard/GetCreditCardByCompanyId",


};

