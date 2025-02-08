import { FC } from "react";
import { Menu, MenuItem, SubMenu } from "./components";
import style from "./interactionmenu.module.scss";
import { observer } from "mobx-react-lite";
import EventManager from "utils/EventManager.util";
import { hudStore } from "store/Hud.store";

const InteractionMenu: FC<{ store: typeof hudStore }> = ({ store }) => {
    const handleItemClick = (event: any, _index: number, data: number) => {
        EventManager.emitClient("hud", "interactResult", data);
        EventManager.emitServer("hud", "interactResult", data);
        store.hideInteraction();
    };

    if (!store.interactionMenu.isActive || store.interactionMenu.items.length <= 1) return null;

    return (
        <div className={style.main}>
            <Menu show={store.interactionMenu.isActive} outerRadius={150} innerRadius={80} centerX={200} centerY={200} theme={"dark"} animation={["fade", "scale", "rotate"]} animationTimeout={150}>
                {store.interactionMenu.items
                    .filter((x) => x.subItems === undefined)
                    .map((x, e) => (
                        <MenuItem display={"center"} onItemClick={handleItemClick} data={x.id}>
                            {x.text}
                        </MenuItem>
                    ))}

                {store.interactionMenu.items
                    .filter((x) => x.subItems)
                    .map((e, idx) => {
                        return (
                            <SubMenu key={idx} itemView={e.text} data={e.id} displayPosition="center">
                                {e.subItems?.map((_, index) => {
                                    return (
                                        <MenuItem key={index} onItemClick={handleItemClick} data={e.id}>
                                           {e.text}
                                        </MenuItem>
                                    );
                                })}
                            </SubMenu>
                        );
                    })}
            </Menu>
        </div>
    );
};

export default observer(InteractionMenu);
