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
    Parameters: null;
    Parent: number;
    Properties: MenuItemPropertiesInterface;
    Route: string;
    RouteId: number;
    URL: string;
    Visible: Boolean;
}
interface TableTime {
    TimeStamp: string;
} 

export interface ClockInterface{
    Table: TableTime[];
}