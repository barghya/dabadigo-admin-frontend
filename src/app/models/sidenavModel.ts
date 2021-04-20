export interface SidenavItem {
    headerText: string;
    headerIcon: string;
    open: boolean;
    menuItems: SidenavMenuItems[];
}

export interface SidenavMenuItems {
    control?: string;
    menuText: string;
    menuLink: string;
    permission?: number;
}