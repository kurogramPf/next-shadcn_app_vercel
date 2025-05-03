export type NavItemType = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type SiteConfigType = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    x: string;
    github: string;
  };
};

// MarketingConfigの呼び出し先で、複数のNavItemTypeの型指定をできる
export type MarketingConfig = {
  mainNav: NavItemType[];
};

export type SidebarNavItem = {
  title: string;
  // disabledはtrueの時は、リンクが用意できていない時
  disabled?: boolean;
  // externalがtrueの時は、外部リンク
  external?: boolean;
  // keyofはオブジェクト型のプロパティ名(key名)を取得し「型」に対して使用
  // typeofは実際の値を型に変換「変数」に対して使用
  // https://qiita.com/tak001/items/bec3ab7c1bb4df52a7e7
  icon?: keyof typeof Icon;
} & ( // ↓はユニオン型の記述
  | {
      // itemsがない場合はhrefを必須
      href: string;
      // never型には何も代入できません
      items?: never;
    }
  | {
      // hrefがない場合はitemsを必須
      href?: string;
      items: NavItem[];
    }
);

export type DashboardConfigType = {
  mainNav: NavItem[];
  sidebarNav: SidebarNavItem[];
};
