import {ICardTheme} from "./ICardTheme";
import {IMobileMenu} from "./MobileMenu";
import {IMyMenu} from "./MyMenu";

export type IThemeType = {
    text_color: string;
    a: string;
    bg_color: string;
    card_background: string;
    card: ICardTheme;
    menu: IMyMenu;
};