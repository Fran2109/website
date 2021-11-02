export interface LanguageInterface{
    id: number;
    name: string;
    label: string;
}
export interface MenuDataProcessedInterface{
    Items: Array<MenuItemInterface>;
}
export interface MenuDataTableInterface{
    Id: number;
    Parent: number;
    Name: string;
    RouteID: number;
    SortOrder: number;
    Enabled: boolean;
    Visible: boolean;
    RequiredRole: string;
    Group: string;
    IHBoxModule: string;
    Code: string;
    KeepData: boolean;
    Route: string;
}
export interface MenuDataTable1Interface{
    MenuLinkID: number;
    Name: string;
    Value: string;
}
export interface MenuDataTable2Interface{
    MenuId: number;
    Name: string;
    Value: string;
}
export interface MenuDataInterface{
    Table: Array<MenuDataTableInterface>;
    Table1: Array<MenuDataTable1Interface>;
    Table2: Array<MenuDataTable2Interface>;
}
export interface MenuItemPropertiesInterface{
    Name: string;
    Value: string;
}
export interface MenuItemInterface{
    Children: Array<MenuItemInterface>;
    Enabled: Boolean;
    Group: string | null;
    Id: number;
    Name: string | null;
    Order: number | null;
    Parameters?: MenuItemPropertiesInterface;
    Parent: number | null;
    Properties?: MenuItemPropertiesInterface;
    Route: string;
    RouteId: number | null;
    URL?: string | null;
    Visible: Boolean;
}
export interface DBOptionsInterface{
    headerOptions: MenuItemInterface[] | undefined;
    trendingOption: MenuItemInterface[] | undefined;
    configurationOptions: MenuItemInterface[] | undefined;
}
interface TableTime {
    TimeStamp: string;
} 
export interface ClockInterface{
    Table: TableTime[];
}
export interface ModuleInterface{
    ModuleId : number;
    ActionId? : number;
    Code : string;
    Name : string;
    Value : boolean;
}
export interface ModuleActionsAndPagesInterface{
    id: number | null;
    actions: Array<ModuleActionsInterface>;
    code: string; 
    name: string;
    value: boolean;
}
export interface ModuleActionsInterface{
    id?: number | null,
    code: string, 
    name: string,
    value: boolean,
}
export interface PermissionsInterface{
    Table: ModuleInterface[];
    Table1: ModuleInterface[];
}
export interface LoginToken{
    setToken: (username: string)=>void
}
export interface UserInformationInterface{
    userName: string | null | undefined,
    tymeZone: UserInfoTableInterface | undefined,
    permissions: Array<ModuleActionsAndPagesInterface> | undefined;
}
export interface UserInfoTableInterface{
    UserID: number,
    AccountID: number,
    Email: string,
    Validated: boolean,
    Number: number,
    RecoveryPassword: boolean,
    AccountType: number,
    FirstTimeLogin: boolean,
    DebugMode: boolean,
    TimeZoneOffset: number,
    TimeZoneName: string,
    TimeZoneIsDST: boolean,
    TimeZoneAbbreviation: string,
    MaxAgents: number,
    MaxTags: number,
    IHServerHost: string,
}
export interface UserInfoInterface{
    Table: Array<UserInfoTableInterface>,
}