export interface LanguageInterface{
    id: number;
    name: string;
    label: string;
}

export interface MenuItemPropertiesInterface{
    Name: string;
    Value: string;
}

export interface MenuItemInterface{
    Children: Array<MenuItemInterface>;
    Enabled: Boolean;
    Group: string;
    Id: number;
    Name: string;
    Order: number;
    Parameters: MenuItemPropertiesInterface;
    Parent: number;
    Properties: MenuItemPropertiesInterface;
    Route: string;
    RouteId: number;
    URL: string;
    Visible: Boolean;
}

export interface DBOptionsInterface{
    headerOptions: MenuItemInterface[];
    trendingOption: MenuItemInterface[];
    configurationOptions: MenuItemInterface[];
}

interface TableTime {
    TimeStamp: string;
} 

export interface ClockInterface{
    Table: TableTime[];
}

export interface ModuleIterface{
    ModuleId : number;
    ActionId? : number;
    Code : string;
    Name : string;
    Value : boolean;
}
export interface PermissionsInterface{
    Table: ModuleIterface[];
    Table1: ModuleIterface[];
}

export interface LoginToken{
    setToken: (username: string)=>void
}