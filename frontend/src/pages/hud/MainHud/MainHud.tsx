import { observer } from "mobx-react-lite";
import { FC, useMemo } from "react";
import { entries } from "mobx";

import { hudStore } from "store/Hud.store";
import { playerStore } from "store/Player.store";

import Speedometer from "./components/Speedometer";
import { StreetOutput } from "./components/street";
import { MoneyOutput } from "./components/money";

import star from "assets/images/hud/icons/star.svg";
import ammoicon from "assets/images/hud/icons/ammo.svg";

import styles from "./mainhud.module.scss";

type Props = {
    store: typeof hudStore;
    playerStore: typeof playerStore;
};

const MainHUD: FC<Props> = ({ store, playerStore }) => {
    const { areaData, vehicleData } = store;
    const { data, keybindGuide, nowPlaying } = playerStore;

    const getWeaponImage = useMemo(() => {
        return new URL(`../../../assets/images/hud/weapons/${data.weapondata?.weapon}.svg`, import.meta.url).href;
    }, [data.weapondata]);

    return (
        <div className={styles.mainhud}>
            <div className={styles.left}>
                <MoneyOutput cash={data.cash} wallet={100000} />

                <StreetOutput area={areaData.area} street={areaData.street} />
            </div>

            <div className={styles.center}></div>

            <div className={styles.right}>
                <div className={styles.servername}>
                    {/* TODO-MResearch: Gecko Freeroam? Подумать над самим лого, и в каком исполнении оно должно быть */}
                    <span className={styles.logo}>Gecko FRM</span>

                    <div className={styles.playerInfo}>
                        <span className={styles.id}>#{data.id}</span>
                        <span className={styles.online}>{nowPlaying} / 1000</span>
                    </div>
                </div>

                {data.wantedLevel > 0 && (
                    <div className={styles.stars}>
                        {Array.from({ length: data.wantedLevel }).map((_e, x) => (
                            <img src={star} alt="star" key={x} />
                        ))}
                    </div>
                )}

                {data.weapondata && (
                    <div className={styles.weaponInfo}>
                        <img src={getWeaponImage} alt="" />
                        <span className={styles.ammodata}>
                            <img src={ammoicon} alt="ammo" />
                            {data.weapondata.ammo}/{data.weapondata.maxammo}
                        </span>
                    </div>
                )}

                <div className={styles.keybindGuide}>
                    {entries(keybindGuide).map(([key, label], e) => (
                        <div key={e} className={styles.keybind}>
                            <span className={styles.key}>{key}</span>
                            {label}
                        </div>
                    ))}
                </div>

                {vehicleData.isActive && (
                    <div className={styles.speedo}>
                        <Speedometer store={store} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default observer(MainHUD);
